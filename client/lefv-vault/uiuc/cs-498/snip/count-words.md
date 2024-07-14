```python3

def count_words(code_string): 
	s = re.sub('[^0-9a-zA-Z_]+', '*', code_string) 
	words = [w for w in s.split('*') if (w.isupper() or w.islower())] 
	return len(words)

```
