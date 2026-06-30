from fastapi import APIRouter
from pydantic import BaseModel
import ollama

router = APIRouter(tags=["AI"])


class DescriptionRequest(BaseModel):
    name: str
    category: str
    price: float


@router.post("/generate-description")
def generate_description(request: DescriptionRequest):

    prompt = f"""
    You are an expert e-commerce copywriter.

    Generate a professional product description.

    Product Name: {request.name}
    Category: {request.category}
    Price: ₹{request.price}

    Keep it around 120 words.
    Mention features and benefits.
    Return only the description.
    """

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "description": response["message"]["content"]
    }
