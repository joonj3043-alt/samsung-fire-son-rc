(()=>{
'use strict';
const c=window.SITE_CONFIG||{};
const phone=c.phone||'01038173043';
const display=c.phoneDisplay||'010-3817-3043';
const smsBody=c.smsBody||'[홈페이지 상담문의] 안녕하세요. 손성준 RC님, 보험 상담 문의드립니다.';

document.querySelectorAll('.js-year').forEach(e=>e.textContent=new Date().getFullYear());

document.querySelectorAll('.js-phone').forEach(e=>{
  e.href='tel:'+phone;
  e.setAttribute('aria-label',display+' 전화걸기');
});
document.querySelectorAll('.js-phone-label').forEach(e=>{
  e.textContent=display;
  if(e.tagName==='A') e.href='tel:'+phone;
});
document.querySelectorAll('.js-sms').forEach(e=>{
  e.href='sms:'+phone+'?body='+encodeURIComponent(smsBody);
  e.setAttribute('aria-label',display+' 문자 보내기');
});
document.querySelectorAll('.js-email-label').forEach(e=>{
  if(c.email) e.textContent=c.email;
});
document.querySelectorAll('[data-official-url]').forEach(e=>{
  e.href=c.officialUrl||'https://www.samsungfire.com/';
  e.target='_blank';
  e.rel='noopener noreferrer';
});
document.querySelectorAll('[data-claim-url]').forEach(e=>{
  e.href=c.claimUrl||'https://www.samsungfire.com/vh/page/VH.HPCLA001.do';
  e.target='_blank';
  e.rel='noopener noreferrer';
});

let base=(c.siteUrl||'').replace(/\/$/,'');
if(!base && /^https?:$/.test(location.protocol)){
  base=location.origin+location.pathname.replace(/\/[^/]*$/,'');
}
if(base){
  document.querySelectorAll('[data-canonical-path]').forEach(e=>{
    const p=e.dataset.canonicalPath==='index.html'?'':e.dataset.canonicalPath;
    e.href=base+'/'+p;
  });
  const og=document.querySelector('meta[property="og:url"]');
  if(og) og.content=location.href;
  const ogi=document.querySelector('meta[property="og:image"]');
  if(ogi && !ogi.content) ogi.content=base+'/assets/images/son-sungjoon-og.jpg';
}

const btn=document.querySelector('.menu-btn');
const nav=document.querySelector('#primary-nav');
if(btn&&nav){
  const label=btn.querySelector('.sr-only');
  const setMenu=(open)=>{
    btn.setAttribute('aria-expanded',String(open));
    nav.classList.toggle('open',open);
    if(label) label.textContent=open?'메뉴 닫기':'메뉴 열기';
  };
  btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') setMenu(false);});
}

document.querySelectorAll('.faq details').forEach(d=>{
  d.addEventListener('toggle',()=>{
    if(d.open){
      document.querySelectorAll('.faq details[open]').forEach(o=>{if(o!==d)o.open=false;});
    }
  });
});
})();
// v16.1 · insurance self-check interaction (informational only; no underwriting judgement)
(()=>{
  const box=document.querySelector('.review-checklist');
  if(!box) return;
  const checks=[...box.querySelectorAll('input[type="checkbox"]')];
  const listCount=document.querySelector('[data-check-count]');
  const scoreCount=document.querySelector('[data-score-count]');
  const progress=document.querySelector('[data-score-progress]');
  const update=()=>{
    const n=checks.filter(c=>c.checked).length;
    if(listCount) listCount.textContent=n;
    if(scoreCount) scoreCount.textContent=n;
    if(progress) progress.style.width=((n/checks.length)*100)+'%';
  };
  checks.forEach(c=>c.addEventListener('change',update));
  update();
})();
