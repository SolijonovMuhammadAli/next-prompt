import { connectToDbB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDbB();

    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDbB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Feiled error", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDbB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Feiled to delete", { status: 500 });
  }
};
