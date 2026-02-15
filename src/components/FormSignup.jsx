import { useState } from "react";
import Image from "next/image";

export default function FormSignup({ content, social }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
    why: ""
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");

    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="join" className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-beige bg-white p-8 shadow-soft">
          <h2 className="text-3xl font-semibold text-charcoal">
            {content.heading}
          </h2>

          {status === "success" ? (
            <div className="mt-6 space-y-4">
              <p className="text-base text-charcoal/80">{content.success}</p>
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-coral px-5 py-3 text-sm font-semibold text-coral transition hover:bg-coral hover:text-white"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
                {content.afterSubmitSecondaryCta}
              </a>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.name}
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.email}
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.phone}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.goal}
                <select
                  name="goal"
                  required
                  value={formData.goal}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="" disabled>
                    {content.goal}
                  </option>
                  {content.goalOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.why}
                <textarea
                  name="why"
                  rows={4}
                  value={formData.why}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              {status === "error" && (
                <p className="text-sm text-coral">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-darkgreen disabled:cursor-not-allowed disabled:opacity-70"
              >
                {content.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
