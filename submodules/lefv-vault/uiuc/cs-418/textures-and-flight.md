# TEXTURE AND FLIGHT

## DESCRIPTION

https://courses.grainger.illinois.edu/cs418/fa2022/hw-texture.html

## EXAMPLE

Sure, here is a solution to the question:

```python
import math
import random

def generate_texture(width, height):
  """Generates a random texture of width x height
  pixels.

  Args:
    width, height: The width and height of the texture.

  Returns:
    A list of lists representing the pixels in the texture.
  """

  pixels = []
  for row in range(height):
    row_pixels = []
    for col in range(width):
      color = random.uniform(0.0, 1.0)
      red = int(color * 255)
      green = int(color * 255)
      blue = int(color * 255)
      row_pixels.append((red, green, blue))
    pixels.append(row_pixels)
  return pixels

def main():
  width, height = 100, 100
  pixels = generate_texture(width, height)
  for row in pixels:
    for pixel in row:
      print(pixel, end=" ")
    print()

if __name__ == "__main__":
  main()
```

This program first defines a function called `generate_texture()` that takes the width and height of a texture, and returns a list of lists representing the pixels in the texture. The function works by first generating a random color for each pixel in the texture. Then, it converts the color to a list of three integers representing the red, green, and blue components of the color. Finally, it returns a list of lists containing the color values for each row in the texture.

The main function of the program then takes the width and height of the texture as input, and calls the `generate_texture()` function to generate a random texture. The list of pixels in the texture is then printed to the console.

To run the program, you can save it as a Python script and then run it from the command line. For example, if you save the program as `generate_texture.py`, you can run it by typing the following command into the command line:

```
python generate_texture.py
```

This will print the list of pixels in the texture to the console.

I hope this helps! Let me know if you have any other questions.
