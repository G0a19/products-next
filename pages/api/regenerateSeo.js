import initializeSeoFile from "../../backend-helper/initializeSeoFile";

export default async function handler(req, res) {
  // Only allow POST requests to regenerate SEO file
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed. Use POST." });
  }

  try {
    const result = await initializeSeoFile();
  } catch (error) {
    console.error("Error in regenerate SEO API:", error);
    return res.status(500).json({
      message: "Failed to regenerate SEO file",
      error: error.message,
    });
  }

  return res.status(200).json({
    message: "SEO file regenerated successfully",
  });
}
