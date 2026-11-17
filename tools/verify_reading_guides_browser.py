import datetime
import json,threading,functools,http.server,hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
shots=root/'dist/reading-guide-screenshots';shots.mkdir(parents=True,exist_ok=True)
class Handler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(root)));threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/downloads/language-learning-test.html'
summary={'version':'0.4.12','directions':{},'layouts':[],'physicalDevices':'NOT RUN','fluentHumanReview':'NOT RUN','fullScreenReaderAudit':'NOT RUN'}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 context=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url);page.clock.install(time=datetime.datetime(2026,1,1,tzinfo=datetime.timezone.utc));page.clock.pause_at(datetime.datetime(2026,1,1,0,0,1,tzinfo=datetime.timezone.utc));assert page.locator('#direction option').count()==7
 for direction in ['lv-ru','lv-en','ru-lv','ru-en','en-lv','en-ru','en-ja']:
  if page.locator('#practice').is_visible() or page.locator('#finished').is_visible():page.locator('#change' if page.locator('#practice').is_visible() else '#choose').click()
  page.select_option('#direction',direction);page.locator('#start').click()
  result=page.evaluate('''()=>{
   const course=JSON.parse(document.querySelector('#course-data').textContent),pack=JSON.parse(document.querySelector('#reading-data').textContent),audio=JSON.parse(document.querySelector('#audio-data').textContent);
   window.readingRun={course,pack,audio,ids:course.lessons.flatMap(l=>l.prompts.map(p=>p.phraseId)),direction:document.querySelector('#direction').value,count:0,options:0};return readingRun.ids.length;
  }''');assert result==510
  for n in range(510):
   page.evaluate('''n=>{const r=readingRun,rows=[...document.querySelectorAll('.answer-option')];if(rows.length!==4)throw Error('missing answers');
    for(const row of rows){const a=row.querySelector('.choice'),sp=row.querySelector('.answer-replay'),id=a.dataset.optionId,e=r.pack.directions[r.direction]?.[id],gs=[...a.querySelectorAll('.reading-guide')];
     if(gs.length!==(e?.segments.length||0))throw Error('guide coverage '+r.direction+' '+id);
     if(e){if(a.getAttribute('aria-label')!==e.text)throw Error('changed name');if(gs.map(x=>x.textContent).join('|')!==e.segments.map(x=>x.reading).join('|'))throw Error('reading mismatch');
      if(r.direction==='en-ja')for(const [i,s]of e.segments.entries()){if(gs[i].previousElementSibling.textContent!==s.text)throw Error('symbol misalignment');if((s.combinedReading||/^[っッー]$/.test(s.text)||s.text.length>1)&&s.note&&!gs[i].nextElementSibling?.textContent)throw Error('invisible role');}
     }
     const progress=document.querySelector('#progress').value,feedback=document.querySelector('#feedback').textContent;sp.click();if(document.querySelector('#progress').value!==progress||document.querySelector('#feedback').textContent!==feedback||a.disabled)throw Error('speaker graded');
     if(document.querySelector('#audio-media').src!==r.audio.clips[r.direction.split('-')[1]][id].src)throw Error('wrong clip');r.options++;
    }
    document.querySelector(`[data-option-id="${r.ids[n]}"]`).click();r.count++;
   }''',n)
   page.clock.run_for(499);assert page.locator('.choice:disabled').count()==4
   page.clock.run_for(1)
  assert page.locator('#finished').is_visible();assert page.evaluate('document.querySelector("#audio-media").paused')
  summary['directions'][direction]=page.evaluate('({questions:readingRun.count,answerGuideAndReplayBindings:readingRun.options})')
 # Layout/keyboard checks using greetings, every small-kana item and the longest target texts.
 page.locator('#choose').click()
 for direction in ['lv-ru','ru-en','en-ja']:
  for dark in [False,True]:
   for width in [320,390,1280]:
    page.set_viewport_size({'width':width,'height':900})
    page.select_option('#direction',direction);page.locator('#start').click()
    isdark=page.evaluate('document.documentElement.dataset.theme==="dark"')
    if isdark!=dark:page.locator('#learning-theme-toggle').click()
    # Test every source bank item's reading with production rendering, preserving real app integration.
    page.evaluate('''()=>{
     const pack=JSON.parse(document.querySelector('#reading-data').textContent),direction=document.querySelector('#direction').value,v=LanguageReadingView.create(document,pack),b=document.querySelector('.choice');
     for(const[id,e]of Object.entries(pack.directions[direction])){v.render(b,direction,id,e.text);if(document.documentElement.scrollWidth>innerWidth+1)throw Error('horizontal overflow '+id);for(const unit of b.querySelectorAll('.reading-unit'))if(unit.getBoundingClientRect().right>b.getBoundingClientRect().right+1)throw Error('unit overflow '+id);}
    }''')
    page.locator('#restart').click()
    page.locator('.answer-replay').first.focus();page.keyboard.press('Enter');assert page.locator('#progress').get_attribute('value')=='0'
    assert page.locator('.answer-replay').first.evaluate('(x)=>x===document.activeElement')
    path=str(shots/(f'{direction}-{width}-'+('dark' if dark else 'light')+'.png'))
    page.screenshot(path=path,full_page=True)
    summary['layouts'].append({'direction':direction,'width':width,'theme':'dark' if dark else 'light','horizontalOverflow':False,'keyboardSpeakerWithoutGrading':True})
    page.locator('#change').click()
 assert page.evaluate('localStorage.length+sessionStorage.length')==0;assert page.evaluate('document.cookie')=='';assert context.cookies()==[]
 page.reload();assert page.locator('#setup').is_visible();page.locator('#start').click();assert page.locator('#progress').get_attribute('value')=='0';assert not errors,errors
 summary['zeroStorageReloadReset']=True;summary['pageErrors']=errors
 b.close()
server.shutdown()
summary['sha256']=hashlib.sha256((root/'downloads/language-learning-test.html').read_bytes()).hexdigest()
(root/'docs/delivery/2026-11-17-reading-guides-browser.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary,indent=2))
