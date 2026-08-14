# we make a list of values
c_t = [10,-20,-289,100,987]
def temp(c):
    faren = c * 9 / 5 + 32
    if c < -273:
        return("that temperature doesnt make sense")
    else:
        return(faren)
with open("dat.txt","w") as file:
    for b in c_t:
        cont = file.write(str(temp(b))+"\n")
print(cont)
