# Warmup: Text to PNG

## NOTES

https://courses.grainger.illinois.edu/cs418/fa2022/hw-png.html

## EXAMPLE

https://bard.google.com

Sure, here is my original answer to the question:

```python
import png

def print_png_info(filename):
  with open(filename, "rb") as f:
    reader = png.Reader(f)
    width, height, bit_depth, _ = reader.read_header()
    print(f"Width: {width}")
    print(f"Height: {height}")
    print(f"Bit depth: {bit_depth}")

if __name__ == "__main__":
  print_png_info("image.png")
```

This program first imports the `png` module, which provides a Python interface to the PNG image format. Then, it defines a function called `print_png_info()` that takes a filename as input and prints the width, height, and bit depth of the PNG image file. The function first opens the file in binary mode and then uses the `png.Reader()` class to read the header of the PNG file. The header contains the width, height, and bit depth of the image. The function then prints these values to the console.

To run the program, you can save it as a Python script and then run it from the command line. For example, if you save the program as `png_info.py`, you can run it by typing the following command into the command line:

```
python png_info.py image.png
```

This will print the width, height, and bit depth of the PNG image file `image.png` to the console.

I hope this helps! Let me know if you have any other questions.
