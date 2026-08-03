export async function submitForm(source: string, fields: Record<string, string>, files?: File[]) {
  let res: Response;

  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append("source", source);
    formData.append("fields", JSON.stringify(fields));
    files.forEach((file) => formData.append("attachments", file));

    res = await fetch("/api/contact", {
      method: "POST",
      body: formData, // browser sets the multipart Content-Type + boundary automatically
    });
  } else {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, fields }),
    });
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }

  return data;
}
