import { readFile } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
  try {
    const filePath = join(process.cwd(), "public/files/cv.pdf");
    const fileBuffer = await readFile(filePath);

    setResponseHeader(
      event,
      "Content-Disposition",
      'attachment; filename="cv.pdf"'
    );
    setResponseHeader(event, "Content-Type", "application/pdf");

    return fileBuffer;
  } catch (error) {
    console.error(error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "File not found" })
    );
  }
});
