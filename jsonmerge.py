import glob

read_files = glob.glob("letters/*.json")
with open("merged_letters.json", "wb") as outfile:
    outfile.write('{}'.format(
        '\n'.join([open(f, "rb").read() for f in read_files])));
