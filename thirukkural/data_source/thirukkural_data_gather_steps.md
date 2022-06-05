# Thirukkural gather data

* <https://www.tamilvu.org/ta/library-l2100-html-l2100ind-128184>

url <https://www.tamilvu.org/slet/l2100/l2100son.jsp?subid=848>

selector
#l2100son > div > table > tbody > tr:nth-child(4) > td.poem

copy JS path:
document.querySelector("#l2100son > div > table > tbody > tr:nth-child(4) > td.poem")

document.querySelector("#l2100son > div > table > tbody > tr > td.poem")

Full XPath:
/html/body/div/table/tbody/tr[4]/td[2]
/html/body/div/table/tbody/tr/td

document.querySelector("/html/body/div/table/tbody/tr/td")

document.querySelector("html > body > div > table > tbody > tr:nth-child(4) > td.poem")

document.querySelector("html > body > div > table > tbody > tr:nth-child(3) > td.poem")

https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

document.querySelectorAll("html > body > div > table > tbody > tr:nth-child(4) > td.poem")
dataElements = document.querySelectorAll("html > body > div > table > tbody > tr > td.poem");
data = Array.from(dataElements);
kurals = data.map(poem => poem.innerText)

"சிற்றினம் அஞ்சும், பெருமை; சிறுமைதான்\nசுற்றமாச் சூழ்ந்துவிடும்."
1: "நிலத்து இயல்பான் நீர் திரிந்து, அற்று ஆகும்;- மாந்தர்க்கு\n‘இனத்து’ இயல்பது ஆகும், அறிவு."
2: "மனத்தான் ஆம், மாந்தர்க்கு உணர்ச்சி; இனத்தான் ஆம்,\n‘இன்னான்’ எனப்படும் சொல்."
3: "மனத்து உளது போலக் காட்டி, ஒருவற்கு\nஇனத்து உளது ஆகும்-அறிவு."
4: "மனம் தூய்மை, செய்வினை தூய்மை, இரண்டும்\nஇனம் தூய்மை தூவா வரும்."
5: "மனம் தூயார்க்கு எச்சம் நன்று ஆகும்; இனம் தூயார்க்கு\nஇல்லை, நன்று ஆகா வினை."
6: "மன நலம் மன் உயிர்க்கு ஆக்கம்; இன நலம்\nஎல்லாப் புகழும் தரும்."
7: "மன நலம் நன்கு உடையர் ஆயினும், சான்றோர்க்கு\nஇன நலம் ஏமாப்பு உடைத்து."
8: "மன நலத்தின் ஆகும், மறுமை; மற்று அஃதும்\nஇன நலத்தின் ஏமாப்பு உடைத்து."
9: "நல் இனத்தின் ஊங்கும் துணை இல்லை; தீ இனத்தின்\nஅல்லற்படுப்பதூஉம் இல்."


//*[@id="l2100son"]/div/table/tbody/tr[4]/td[3]/span/a

document.querySelector("html > body > div > table > tbody > tr > td > span > a")

https://www.tamilvu.org/library/l2100/audio/1.mp3
https://www.tamilvu.org/library/l2100/audio/451.mp3
https://www.tamilvu.org/library/l2100/audio/341.mp3
https://www.tamilvu.org/library/l2100/audio/1330.mp3


https://www.tamilvu.org/slet/l2100/l2100sel.jsp?book_id=31&head_id=27
https://www.tamilvu.org/slet/l2100/l2100sec.jsp?book_id=31&head_id=26&auth_id=31
https://www.tamilvu.org/slet/l2100/l2100uri.jsp?song_no=355


https://www.tamilvu.org/slet/l2100/l2100sec.jsp?book_id=31&head_id=26&auth_id=32
https://www.tamilvu.org/slet/l2100/l2100uri.jsp?song_no=355

https://www.tamilvu.org/slet/l2100/l2100sec.jsp?book_id=31&head_id=26&auth_id=34
https://www.tamilvu.org/slet/l2100/l2100uri.jsp?song_no=355

https://www.tamilvu.org/slet/l2100/l2100son.jsp?subid=803
https://www.tamilvu.org/slet/l2100/l2100son.jsp?subid=935