export function formatPossessive(name: string) {
  if (!name) return "";
  return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";

  const isoDateString = dateString.replace(" ", "T");

  try {
    return new Date(isoDateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}

export function capitalizeFirstLetter(text: string | null | undefined): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
