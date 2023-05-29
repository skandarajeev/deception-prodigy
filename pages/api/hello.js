// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from "path";
import fs from "fs";
export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "json/tree.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  if (req.method !== "POST") {
    res.status(402).json({ value: "Nice Try" });
    return;
  }
  if (data[req.body.chosen]) {
    res.status(200).json(data[req.body.chosen]);
    return;
  }
  res.status(200).json({
    value: "The Card is not created yet",
    children: [{ title: "Reset", name: "start" }],
  });
}
