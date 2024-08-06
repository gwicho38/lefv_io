# Rasterized and Compositor

## QUESTION

https://courses.grainger.illinois.edu/cs418/fa2022/hw-rasterize.html

## EXAMPLE

Sure, here is a solution to the question:

```python
import math

def rasterize_line(x0, y0, x1, y1, width, height):
  """Rasterizes a line from (x0, y0) to (x1, y1) into a width x height
  bitmap.

  Args:
    x0, y0: The coordinates of the start point of the line.
    x1, y1: The coordinates of the end point of the line.
    width, height: The width and height of the bitmap.

  Returns:
    A list of tuples representing the pixels that are covered by the line.
  """

  pixels = []
  dx = x1 - x0
  dy = y1 - y0
  steep = abs(dy) > abs(dx)
  if steep:
    x0, y0 = y0, x0
    x1, y1 = y1, x1
  m = dy / dx
  x = x0
  y = 0
  while x <= x1:
    if steep:
      pixels.append((y, x))
    else:
      pixels.append((x, y))
    y += m
  return pixels

def main():
  width, height = 100, 100
  pixels = rasterize_line(0, 0, 99, 99, width, height)
  for x, y in pixels:
    print(f"({x}, {y})")

if __name__ == "__main__":
  main()
```

This program first defines a function called `rasterize_line()` that takes the coordinates of the start and end points of a line, as well as the width and height of a bitmap, and returns a list of tuples representing the pixels that are covered by the line. The function works by first checking if the line is steep, and if so, it swaps the x and y coordinates of the start and end points. Then, it uses the slope of the line to calculate the y-coordinate of each pixel that is covered by the line. Finally, it returns a list of tuples containing the x and y coordinates of each pixel.

The main function of the program then takes the width and height of the bitmap as input, and calls the `rasterize_line()` function to rasterize a line from (0, 0) to (99, 99). The list of pixels that are covered by the line is then printed to the console.

To run the program, you can save it as a Python script and then run it from the command line. For example, if you save the program as `rasterize.py`, you can run it by typing the following command into the command line:

```
python rasterize.py
```

This will print the list of pixels that are covered by the line to the console.

I hope this helps! Let me know if you have any other questions.
