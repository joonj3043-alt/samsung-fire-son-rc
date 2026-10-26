from playwright.sync_api import sync_playwright
import subprocess,time
proc=subprocess.Popen(['python','-m','http.server','8765','--directory','/mnt/data/soncare_work'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1)
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for w in [390,768,1100,1101,1280,1440,1920]:
   page=browser.new_page(viewport={'width':w,'height':900},device_scale_factor=1)
   page.goto('http://localhost:8765/home/',wait_until='networkidle')
   info=page.evaluate('''() => {let a=document.querySelector('.soncare-hero'),c=document.querySelector('.hero-copy'),h=c.querySelector('h1'),s=document.querySelector('.soncare-sign');let r=x=>{let t=x.getBoundingClientRect();return [Math.round(t.x),Math.round(t.y),Math.round(t.width),Math.round(t.height)]};return {scrollWidth:document.documentElement.scrollWidth,hero:r(a),copy:r(c),title:r(h),sign:r(s),img:getComputedStyle(a,'::before').backgroundImage.slice(0,110)}}''')
   print(w,info)
   page.screenshot(path=f'/mnt/data/soncare_work/preview_{w}.png',full_page=False)
   page.close()
  browser.close()
finally:proc.terminate()
