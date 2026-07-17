import express from "express";
import path from "path";
import { promises as fs } from "fs";
import { createServer as createViteServer } from "vite";
import { JSONDb } from "./server/db";
import { DatabaseSchema, AuditRequest, ContactMessage, MediaItem, PortfolioProject, PackageItem, ServiceItem, TestimonialItem, FAQItem } from "./src/types";

const app = express();
const PORT = 3000;

// Increase body parser limits for base64 media uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ensure uploads folder exists and serve it statically
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(console.error);
app.use("/uploads", express.static(UPLOADS_DIR));

import crypto from "crypto";

const SESSION_COOKIE_NAME = "b2bfiy_session";
const TOKEN_SECRET = "b2bfiy-agency-secret-key-1122"; // Secure signature secret for stateless tokens

function generateToken(username: string): string {
  const expires = Date.now() + 86400000; // 24 hours
  const payload = JSON.stringify({ username, expires });
  const signature = crypto.createHmac("sha256", TOKEN_SECRET).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + signature;
}

function verifyToken(token: string): { username: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const payloadStr = Buffer.from(parts[0], "base64").toString("utf8");
    const signature = parts[1];
    
    const expectedSignature = crypto.createHmac("sha256", TOKEN_SECRET).update(payloadStr).digest("hex");
    if (signature !== expectedSignature) return null;
    
    const payload = JSON.parse(payloadStr);
    if (payload.expires < Date.now()) return null;
    
    return { username: payload.username };
  } catch (e) {
    return null;
  }
}

// Helper middleware to check if authenticated
const requireAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie;
  
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (cookieHeader) {
    const cookies = Object.fromEntries(cookieHeader.split(";").map(c => c.trim().split("=")));
    token = cookies[SESSION_COOKIE_NAME];
  }

  const session = token ? verifyToken(token) : null;
  if (session) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access to CMS admin panel." });
  }
};

// API ROUTES (API routes go FIRST)

// 1. Auth API
app.post("/api/auth/login", async (req, res) => {
  const { email, username, password } = req.body;
  const loginId = email || username;
  const db = await JSONDb.load();
  
  // Custom credential lookup in data.json (fallback to defaults if not set)
  // We can store customized admin password in settings to make it fully CMS editable
  const adminEmail = (db.settings as any).adminEmail || "b2bfiy";
  const adminPassword = (db.settings as any).adminPassword || "rakib1122@#";

  if (loginId === adminEmail && password === adminPassword) {
    const token = generateToken(adminEmail);
    
    // Set cookie and send back token
    res.cookie(SESSION_COOKIE_NAME, token, { httpOnly: true, maxAge: 86400000 }); // 24 Hours
    res.json({ token, email: adminEmail, username: adminEmail, success: true });
  } else {
    res.status(401).json({ error: "Invalid username or password!" });
  }
});

app.get("/api/auth/session", async (req, res) => {
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie;
  
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (cookieHeader) {
    const cookies = Object.fromEntries(cookieHeader.split(";").map(c => c.trim().split("=")));
    token = cookies[SESSION_COOKIE_NAME];
  }

  const session = token ? verifyToken(token) : null;
  if (session) {
    const db = await JSONDb.load();
    const adminEmail = (db.settings as any).adminEmail || "b2bfiy";
    res.json({ authenticated: true, email: adminEmail, username: adminEmail });
  } else {
    res.json({ authenticated: false });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME);
  res.json({ success: true });
});

// Update Admin Account (Credentials)
app.post("/api/auth/account", requireAdmin, async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const db = await JSONDb.load();
  
  const currentAdminEmail = (db.settings as any).adminEmail || "b2bfiy";
  const currentAdminPassword = (db.settings as any).adminPassword || "rakib1122@#";

  if (currentPassword !== currentAdminPassword) {
    return res.status(400).json({ error: "The current password is incorrect!" });
  }

  (db.settings as any).adminEmail = email || currentAdminEmail;
  if (newPassword) {
    (db.settings as any).adminPassword = newPassword;
  }

  await JSONDb.save(db);
  res.json({ success: true, message: "Admin account successfully updated." });
});

// 2. Settings API
app.get("/api/settings", async (req, res) => {
  const db = await JSONDb.load();
  // Strip out admin password before sending public settings
  const { adminPassword, ...safeSettings } = db.settings as any;
  res.json({
    settings: safeSettings,
    topbar: db.topbar,
    header: db.header
  });
});

app.post("/api/settings", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.settings = { ...db.settings, ...req.body };
  await JSONDb.save(db);
  res.json(db.settings);
});

app.post("/api/settings/topbar", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.topbar = { ...db.topbar, ...req.body };
  await JSONDb.save(db);
  res.json(db.topbar);
});

app.post("/api/settings/header", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.header = { ...db.header, ...req.body };
  await JSONDb.save(db);
  res.json(db.header);
});

// 3. Hero API
app.get("/api/hero", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.hero);
});

app.post("/api/hero", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.hero = { ...db.hero, ...req.body };
  await JSONDb.save(db);
  res.json(db.hero);
});

// 4. Statistics API
app.get("/api/statistics", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.statistics);
});

app.post("/api/statistics", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.statistics = req.body;
  await JSONDb.save(db);
  res.json(db.statistics);
});

// 5. Client Logos API
app.get("/api/client-logos", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.clientLogos || []);
});

app.post("/api/client-logos", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.clientLogos = req.body;
  await JSONDb.save(db);
  res.json(db.clientLogos);
});

// 6. Services API
app.get("/api/services", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.services);
});

app.post("/api/services", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  const newServices: ServiceItem[] = req.body;
  db.services = newServices;
  await JSONDb.save(db);
  res.json(db.services);
});

// 7. Why Choose Us API
app.get("/api/why-choose-us", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.whyChooseUs);
});

app.post("/api/why-choose-us", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.whyChooseUs = req.body;
  await JSONDb.save(db);
  res.json(db.whyChooseUs);
});

// 8. Portfolio Categories API
app.get("/api/portfolio-categories", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.portfolioCategories);
});

app.post("/api/portfolio-categories", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.portfolioCategories = req.body;
  await JSONDb.save(db);
  res.json(db.portfolioCategories);
});

// 9. Portfolio Projects API
app.get("/api/portfolio", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.portfolioProjects);
});

app.get("/api/portfolio/:slug", async (req, res) => {
  const db = await JSONDb.load();
  const project = db.portfolioProjects.find(p => p.slug === req.params.slug);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found." });
  }
});

app.post("/api/portfolio", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  const newProject: PortfolioProject = req.body;
  
  // Ensure unique ID & slug
  if (!newProject.id) newProject.id = "proj-" + Math.random().toString(36).substring(2, 9);
  if (!newProject.slug) {
    newProject.slug = newProject.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  }

  // Double check uniqueness of slug
  const exists = db.portfolioProjects.some(p => p.slug === newProject.slug);
  if (exists) {
    newProject.slug = `${newProject.slug}-${Math.floor(Math.random() * 1000)}`;
  }

  db.portfolioProjects.push(newProject);
  await JSONDb.save(db);
  res.json(newProject);
});

app.put("/api/portfolio/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  const index = db.portfolioProjects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.portfolioProjects[index] = { ...db.portfolioProjects[index], ...req.body };
    await JSONDb.save(db);
    res.json(db.portfolioProjects[index]);
  } else {
    res.status(404).json({ error: "Project not found." });
  }
});

app.delete("/api/portfolio/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.portfolioProjects = db.portfolioProjects.filter(p => p.id !== req.params.id);
  await JSONDb.save(db);
  res.json({ success: true });
});

// 10. Work Process API
app.get("/api/work-process", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.workProcess);
});

app.post("/api/work-process", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.workProcess = req.body;
  await JSONDb.save(db);
  res.json(db.workProcess);
});

// 11. Packages API
app.get("/api/packages", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.packages);
});

app.post("/api/packages", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.packages = req.body;
  await JSONDb.save(db);
  res.json(db.packages);
});

// 12. Testimonials API
app.get("/api/testimonials", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.testimonials);
});

app.post("/api/testimonials", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.testimonials = req.body;
  await JSONDb.save(db);
  res.json(db.testimonials);
});

// 13. FAQs API
app.get("/api/faqs", async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.faqs);
});

app.post("/api/faqs", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.faqs = req.body;
  await JSONDb.save(db);
  res.json(db.faqs);
});

// 14. Audit Requests (Leads) API
app.get("/api/audit-requests", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.auditRequests || []);
});

app.post("/api/audit-requests", async (req, res) => {
  const db = await JSONDb.load();
  const newLead: AuditRequest = {
    id: "lead-" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    fullName: req.body.fullName || "",
    businessName: req.body.businessName || "",
    email: req.body.email || "",
    whatsapp: req.body.whatsapp || "",
    url: req.body.url || "",
    service: req.body.service || "",
    message: req.body.message || "",
    status: "new",
    notes: "",
    createdAt: new Date().toISOString()
  };

  db.auditRequests = db.auditRequests || [];
  db.auditRequests.unshift(newLead);
  await JSONDb.save(db);
  res.json({ success: true, lead: newLead });
});

app.put("/api/audit-requests/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.auditRequests = db.auditRequests || [];
  const index = db.auditRequests.findIndex(l => l.id === req.params.id);
  if (index !== -1) {
    db.auditRequests[index] = { ...db.auditRequests[index], ...req.body };
    await JSONDb.save(db);
    res.json(db.auditRequests[index]);
  } else {
    res.status(404).json({ error: "Lead not found" });
  }
});

app.delete("/api/audit-requests/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.auditRequests = db.auditRequests || [];
  db.auditRequests = db.auditRequests.filter(l => l.id !== req.params.id);
  await JSONDb.save(db);
  res.json({ success: true });
});

// 15. Contact Messages API
app.get("/api/contact-messages", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.contactMessages || []);
});

app.post("/api/contact-messages", async (req, res) => {
  const db = await JSONDb.load();
  const newMsg: ContactMessage = {
    id: "msg-" + Math.random().toString(36).substring(2, 9),
    fullName: req.body.fullName || "",
    email: req.body.email || "",
    whatsapp: req.body.whatsapp || "",
    message: req.body.message || "",
    status: "new",
    notes: "",
    createdAt: new Date().toISOString()
  };

  db.contactMessages = db.contactMessages || [];
  db.contactMessages.unshift(newMsg);
  await JSONDb.save(db);
  res.json({ success: true, message: newMsg });
});

app.put("/api/contact-messages/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.contactMessages = db.contactMessages || [];
  const index = db.contactMessages.findIndex(m => m.id === req.params.id);
  if (index !== -1) {
    db.contactMessages[index] = { ...db.contactMessages[index], ...req.body };
    await JSONDb.save(db);
    res.json(db.contactMessages[index]);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.delete("/api/contact-messages/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.contactMessages = db.contactMessages || [];
  db.contactMessages = db.contactMessages.filter(m => m.id !== req.params.id);
  await JSONDb.save(db);
  res.json({ success: true });
});

// 16. Media Library API (Base64 file uploader)
app.get("/api/media", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  res.json(db.media || []);
});

app.post("/api/media", requireAdmin, async (req, res) => {
  const { name, mimeType, base64Data } = req.body;
  if (!name || !base64Data) {
    return res.status(400).json({ error: "Invalid media payload" });
  }

  try {
    // Decode base64 and save as file
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");
    
    // Create unique filename
    const ext = path.extname(name) || "." + mimeType.split("/")[1];
    const baseName = path.basename(name, ext).replace(/[^a-zA-Z0-9]/g, "-");
    const fileName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${fileName}`;
    const mediaItem: MediaItem = {
      id: "media-" + Math.random().toString(36).substring(2, 9),
      name,
      url: relativeUrl,
      size: buffer.length,
      mimeType,
      createdAt: new Date().toISOString()
    };

    const db = await JSONDb.load();
    db.media = db.media || [];
    db.media.unshift(mediaItem);
    await JSONDb.save(db);

    res.json(mediaItem);
  } catch (error) {
    console.error("Media upload error:", error);
    res.status(500).json({ error: "Failed to save media file." });
  }
});

app.delete("/api/media/:id", requireAdmin, async (req, res) => {
  const db = await JSONDb.load();
  db.media = db.media || [];
  const itemIndex = db.media.findIndex(m => m.id === req.params.id);
  
  if (itemIndex !== -1) {
    const item = db.media[itemIndex];
    // Delete file from disk
    const fileName = path.basename(item.url);
    const filePath = path.join(UPLOADS_DIR, fileName);
    
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.warn("Could not delete physical file:", filePath);
    }

    db.media.splice(itemIndex, 1);
    await JSONDb.save(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Media not found" });
  }
});


// Export app for serverless platforms like Vercel
export default app;

// Dynamic client-side assets serving / SPA Fallback setup
async function startServer() {
  if (process.env.VERCEL) {
    // On Vercel, we don't start a standalone HTTP server or serve static assets here.
    // Static assets are built into the dist folder and served natively by Vercel CDN,
    // and api paths are routed here.
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
