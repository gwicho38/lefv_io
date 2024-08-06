# PARTICLE EFFECTS

## DESCRIPTION

https://courses.grainger.illinois.edu/cs418/fa2022/hw-particles.html

## EXAMPLE

Sure, here is a solution to the question:

```python
import math
import random

def simulate_particles(width, height, dt, num_particles):
  """Simulates the motion of a given number of particles
  for a given number of time steps.

  Args:
    width, height: The width and height of the image.
    dt: The time step size.
    num_particles: The number of particles to simulate.

  Returns:
    A list of lists representing the pixels in the image.
  """

  pixels = []
  for _ in range(num_particles):
    x = random.uniform(0, width)
    y = random.uniform(0, height)
    velocity = (random.uniform(-1, 1), random.uniform(-1, 1))
    pixels.append((x, y))
  for _ in range(int(1 / dt)):
    for i, (x, y) in enumerate(pixels):
      x += velocity[0] * dt
      y += velocity[1] * dt
      if x < 0 or x >= width or y < 0 or y >= height:
        velocity = (-velocity[0], -velocity[1])
      x, y = int(x), int(y)
      pixels[i] = (x, y)
  return pixels

def main():
  width, height = 100, 100
  dt = 0.01
  num_particles = 100
  pixels = simulate_particles(width, height, dt, num_particles)
  for row in pixels:
    for pixel in row:
      print(pixel, end=" ")
    print()

if __name__ == "__main__":
  main()
```

This program first defines a function called `simulate_particles()` that takes the width, height, dt, and num_particles as input, and simulates the motion of a given number of particles for a given number of time steps. The function works by first generating a random starting position and velocity for each particle. Then, it updates the position and velocity of each particle for a given number of time steps. Finally, it returns a list of lists representing the pixels in the image.

The main function of the program then takes the width and height of the image as input, and calls the `simulate_particles()` function to simulate the motion of the particles. The list of pixels in the image is then printed to the console.

To run the program, you can save it as a Python script and then run it from the command line. For example, if you save the program as `particles.py`, you can run it by typing the following command into the command line:

```
python particles.py
```

This will simulate the motion of the particles and print the list of pixels in the image to the console.

I hope this helps! Let me know if you have any other questions.
