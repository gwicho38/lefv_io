# TERRAIN AND OTHER GEOMETRY

## DESCRIPTION

https://courses.grainger.illinois.edu/cs418/fa2022/hw-terrain.html

## EXAMPLE

Sure, here is a solution to the question:

```python
import math
import random

def generate_terrain(width, height):
  """Generates a random terrain of width x height
  pixels.

  Args:
    width, height: The width and height of the terrain.

  Returns:
    A list of lists representing the pixels in the terrain.
  """

  pixels = []
  for row in range(height):
    row_pixels = []
    for col in range(width):
      height = random.uniform(0.0, 1.0)
      row_pixels.append(int(height * 255))
    pixels.append(row_pixels)
  return pixels

def main():
  width, height = 100, 100
  pixels = generate_terrain(width, height)
  for row in pixels:
    for pixel in row:
      print(pixel, end=" ")
    print()

if __name__ == "__main__":
  main()
```

This program first defines a function called `generate_terrain()` that takes the width and height of a terrain, and returns a list of lists representing the pixels in the terrain. The function works by first generating a random height for each pixel in the terrain. Then, it converts the height to a pixel value between 0 and 255. Finally, it returns a list of lists containing the pixel values for each row in the terrain.

The main function of the program then takes the width and height of the terrain as input, and calls the `generate_terrain()` function to generate a random terrain. The list of pixels in the terrain is then printed to the console.

To run the program, you can save it as a Python script and then run it from the command line. For example, if you save the program as `generate_terrain.py`, you can run it by typing the following command into the command line:

```
python generate_terrain.py
```

This will print the list of pixels in the terrain to the console.

I hope this helps! Let me know if you have any other questions.
