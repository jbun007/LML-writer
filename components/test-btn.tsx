"use client";

export default function testBtn() {
  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/article-creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: "social commentary",
          searchQuery: "032c architecture",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute article creator");
      }

      const data = await response.json();
      console.log(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="mt-4 p-2 bg-orange-500 text-white rounded"
    >
      Initialize Article Creator
    </button>
  );
}
