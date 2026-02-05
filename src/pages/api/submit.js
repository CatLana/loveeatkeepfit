export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, goal, why } = req.body || {};

  if (!name || !email || !goal) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Placeholder: integrate real storage or webhook here.
  console.log("New lead:", { name, email, goal, why });

  return res.status(200).json({ success: true });
}
