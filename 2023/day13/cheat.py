# Puzzle:            https://adventofcode.com/2023/day/13
# Video explanation: https://youtu.be/BaCJ8Ciqt90

# 1. part - What number do you get after summarizing all of your notes?

def find_reflection(pattern):
    length = len(pattern[0])
    max_mirror_size = length // 2 # max half of the input length

    # try all difrerent mirror size
    for m in reversed(range(1, max_mirror_size + 1)):
        # mirror is either at the beginnig or at the end
        for shift in [0, length - 2 * m]:
            is_mirror = True
            for row in pattern:
                # compare the first half with the mirrored second half
                if row[shift:shift + m] != row[shift + m:shift + 2 * m][::-1]:
                    is_mirror = False
                    break

            if not is_mirror: # try next
                continue

            return shift + m # the line of reflection
        
    return 0 # not found

def summarize(pattern):
    # try to find vertical reflection
    res = find_reflection(pattern)
    if res != 0: return res

    # try to find horizontal reflection
    pattern_transposed = list(map(''.join, zip(*pattern)))
    return 100 * find_reflection(pattern_transposed)

with open('input.txt') as f:
    pattern = []
    result = 0

    for line in f.readlines():
        line = line.strip()
        if line == '':
            result += summarize(pattern)
            pattern = []
            continue
        pattern.append(line)

    result += summarize(pattern) # last test case

    print(result)


# 2. part - What number do you get after summarizing the new reflection line in each pattern in your notes?

def diff(s1, s2):
    # return number of differences between two strings
    return sum(1 for x, y in zip(s1, s2) if x != y)

def find_reflection(pattern):
    length = len(pattern[0])
    max_mirror_size = length // 2 # max half of the input length

    # try all difrerent mirror size
    for m in reversed(range(1, max_mirror_size + 1)):
        # mirror is either at the beginnig or at the end
        for shift in [0, length - 2*m]:
            smudges = 1 # we all max 1 smudge
            for row in pattern:
                # subtract the difference between the first half and the mirrored second half
                smudges -= diff(row[shift:shift + m], row[shift + m:shift + 2*m][::-1])

            if smudges != 0: # try next if we didn't find smudge (> 0) or too many (< 0)
                continue

            return shift + m # the line of reflection
        
    return 0 # not found

def summarize(pattern):
    # try to find vertical reflection
    res = find_reflection(pattern)
    if res != 0: return res
    
    # try to find horizontal reflection
    pattern_transposed = list(map(''.join, zip(*pattern)))
    return 100 * find_reflection(pattern_transposed)

with open('input.txt') as f:
    pattern = []
    result = 0

    for line in f.readlines():
        line = line.strip()
        if line == '':
            result += summarize(pattern)
            pattern = []
            continue
        pattern.append(line)

    result += summarize(pattern) # last test case

    print(result)

# 1. and 2. part combined
def diff(s1, s2):
    # return number of differences between two strings
    return sum(1 for x, y in zip(s1, s2) if x != y)

def find_reflection(pattern, allowed_smudges):
    length = len(pattern[0])
    max_mirror_size = length // 2 # max half of the input length

    # try all difrerent mirror size
    for m in reversed(range(1, max_mirror_size + 1)):
        # mirror is either at the beginnig or at the end
        for shift in [0, length - 2*m]:
            smudges = allowed_smudges
            for row in pattern:
                # subtract the difference between the first half and the mirrored second half
                smudges -= diff(row[shift:shift + m], row[shift + m:shift + 2*m][::-1])

            if smudges != 0: # try next if we didn't find smudge (> 0) or too many (< 0)
                continue

            return shift + m # the line of reflection
        
    return 0 # not found

def summarize(pattern, allowed_smudges):
    # try to find vertical reflection
    res = find_reflection(pattern, allowed_smudges)
    if res != 0: return res
    
    # try to find horizontal reflection
    pattern_transposed = list(map(''.join, zip(*pattern)))
    return 100 * find_reflection(pattern_transposed, allowed_smudges)

with open('input.txt') as f:
    pattern = []
    result1 = 0
    result2 = 0

    for line in f.readlines():
        line = line.strip()
        if line == '':
            result1 += summarize(pattern, 0)
            result2 += summarize(pattern, 1)
            pattern = []
            continue
        pattern.append(line)

    result1 += summarize(pattern, 0)
    result2 += summarize(pattern, 1)

    print("%d\n%d" % (result1, result2))