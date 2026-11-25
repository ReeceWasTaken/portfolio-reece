import React, {useEffect, useRef, useState} from 'react';
import world from './worldMap';
import './briefing.css';

// Demo contacts are fictional and never presented as observed attacks.
const demo = [
 {id:'EX-01',lat:40.7,lon:-74,region:'North America',kind:'C2 infrastructure',severity:'HIGH'},
 {id:'EX-02',lat:51.5,lon:-.1,region:'Europe',kind:'Malware distribution',severity:'MEDIUM'},
 {id:'EX-03',lat:35.7,lon:139.7,region:'East Asia',kind:'Botnet indicator',severity:'HIGH'},
 {id:'EX-04',lat:-23.5,lon:-46.6,region:'South America',kind:'Suspicious host',severity:'MEDIUM'},
 {id:'EX-05',lat:1.3,lon:103.8,region:'Southeast Asia',kind:'Malware distribution',severity:'HIGH'}
];
const project = (lon,lat) => [(lon+180)*2.5,(90-lat)*2.5];
export default function Briefing({onClose}) {
 const [now,setNow]=useState(new Date());
 const [selected,setSelected]=useState(null);
 const [filter,setFilter]=useState('ALL');
 const [zoom,setZoom]=useState(1);
 const [center,setCenter]=useState([450,225]);
 const [showDemo,setShowDemo]=useState(true);
 const [intel,setIntel]=useState([]);
 const [status,setStatus]=useState('CONNECTING');
 const [updated,setUpdated]=useState(null);
 const [intro,setIntro]=useState(true);
 const page=useRef(null);
 useEffect(()=>{
  const focus=document.activeElement, overflow=document.body.style.overflow;
  document.body.style.overflow='hidden'; page.current?.focus();
  const clock=setInterval(()=>setNow(new Date()),1000);
  const opening=setTimeout(()=>setIntro(false),2200);
  const key=e=>{if(e.key==='Escape'){e.preventDefault();onClose();}};
  window.addEventListener('keydown',key);
  return ()=>{clearInterval(clock);clearTimeout(opening);window.removeEventListener('keydown',key);document.body.style.overflow=overflow;focus?.focus();};
 },[onClose]);
 // CISA's public KEV catalog is vulnerability intelligence, not geolocated attacks.
 useEffect(()=>{
  let active=true, controller;
  async function refresh(){
   controller?.abort(); controller=new AbortController();
   const timeout=setTimeout(()=>controller.abort(),15000);
   try{
    const res=await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',{signal:controller.signal,cache:'no-cache'});
    if(!res.ok)throw Error('Feed unavailable');
    const data=await res.json(); if(!Array.isArray(data.vulnerabilities))throw Error('Invalid feed');
    if(active){setIntel([...data.vulnerabilities].sort((a,b)=>b.dateAdded.localeCompare(a.dateAdded)).slice(0,12));setUpdated(new Date());setStatus('CONNECTED');}
   }catch{if(active)setStatus('UNAVAILABLE');}finally{clearTimeout(timeout);}
  }
  refresh(); const timer=setInterval(refresh,300000);
  return ()=>{active=false;clearInterval(timer);controller?.abort();};
 },[]);
 const contacts=showDemo?demo.filter(x=>filter==='ALL'||x.severity===filter):[];
 const width=900/zoom,height=450/zoom;
 const pan=(dx,dy)=>setCenter(([x,y])=>[Math.max(width/2,Math.min(900-width/2,x+dx)),Math.max(height/2,Math.min(450-height/2,y+dy))]);
 return <div className="ow-page" ref={page} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Operation Overwatch briefing">
  <header className="ow-header"><div><small>STRATEGIC CYBER INTELLIGENCE COMMAND / 01</small><h1>OPERATION OVERWATCH</h1></div><div className="ow-clock">{now.toISOString().slice(11,19)} Z<br/><small>{now.toISOString().slice(0,10)} / UTC</small></div><button onClick={onClose}>ESC / RETURN</button></header>
  <div className="ow-strip"><span>MISSION 01 — GLOBAL SURVEILLANCE</span><span>UNCLASSIFIED // OSINT</span></div>
  <div className="ow-layout"><section className="ow-map-panel"><div className="ow-panel-head">GLOBAL TACTICAL DISPLAY <span>{showDemo?'SIMULATION CONTACTS':'NO GEOLOCATED FEED'}</span></div>
   <div className="ow-map"><svg viewBox={`${center[0]-width/2} ${center[1]-height/2} ${width} ${height}`} aria-label="World map with fictional demonstration contacts">
    <defs><pattern id="ow-grid" width="37.5" height="37.5" patternUnits="userSpaceOnUse"><path d="M37.5 0H0V37.5" fill="none" stroke="#35545a" strokeWidth=".6"/></pattern></defs>
    <rect width="900" height="450" fill="#101f27"/><rect width="900" height="450" fill="url(#ow-grid)"/>
    <g fill="#294449" stroke="#75918d" strokeWidth=".65">{world.map((d,i)=><path key={i} d={d}/>)}</g>
    <path d="M0 225H900 M450 0V450" stroke="#72918f" strokeDasharray="5 5" opacity=".5"/>
    {contacts.map(c=>{const [x,y]=project(c.lon,c.lat);return <g key={c.id} transform={`translate(${x} ${y})`} className={'ow-contact '+c.severity.toLowerCase()} role="button" tabIndex={0} aria-label={c.id+' fictional '+c.kind} onClick={()=>setSelected(c)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(c);}}}><circle r="13" className="ow-pulse"/><path d="M0 -7L7 0 0 7 -7 0Z"/><text x="10" y="-9">{c.id}</text></g>;})}
   </svg><div className="ow-sweep" aria-hidden="true"/></div>
   <div className="ow-controls"><button onClick={()=>{setZoom(z=>Math.min(3,z+.5));setCenter([450,225]);}}>ZOOM +</button><button onClick={()=>{setZoom(z=>Math.max(1,z-.5));setCenter([450,225]);}}>ZOOM −</button>{[['←',-40,0],['→',40,0],['↑',0,-30],['↓',0,30]].map(([label,x,y])=><button key={label} onClick={()=>pan(x,y)}>{label}</button>)}<button onClick={()=>{setZoom(1);setCenter([450,225]);}}>RESET</button><label><input type="checkbox" checked={showDemo} onChange={e=>{setShowDemo(e.target.checked);setSelected(null);}}/> DEMO CONTACTS</label></div>
   <div className="ow-panel-head">CONTACT INTELLIGENCE <select value={filter} onChange={e=>{setFilter(e.target.value);setSelected(null);}}><option>ALL</option><option>HIGH</option><option>MEDIUM</option></select></div>
   <div className="ow-detail">{selected?`${selected.id} / ${selected.region} / ${selected.kind} / ${selected.severity} — FICTIONAL EXERCISE CONTACT`:'Select a demonstration contact for details. No actual attack locations are displayed.'}</div>
  </section><aside className="ow-intel"><div className="ow-panel-head">INTELLIGENCE UPLINK <span>{status}</span></div><p>CISA / KNOWN EXPLOITED VULNERABILITIES</p><small>{updated?'Last retrieved '+updated.toISOString().slice(11,19)+' UTC':'Awaiting public feed'} · refresh every 5 min</small>{status==='UNAVAILABLE'&&<p>Feed unavailable in this browser. {intel.length?'Showing last retrieved records.':''} <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noreferrer">Open official catalog ↗</a></p>}<div className="ow-feed">{intel.map(v=><a key={v.cveID} href={'https://www.cve.org/CVERecord?id='+encodeURIComponent(v.cveID)} target="_blank" rel="noreferrer"><strong>{v.cveID}</strong><span>{v.vendorProject} / {v.product}</span><small>ADDED {v.dateAdded}</small></a>)}</div></aside></div>
  <section className="ow-mission"><small>MISSION BRIEFING / 001</small><p>Monitor emerging vulnerabilities and maintain situational awareness across the global operational theater. Map contacts are simulated until a geolocated intelligence feed is configured.</p><small>MAP: NATURAL EARTH / PUBLIC DOMAIN · LIVE CATALOG IS NOT AN ATTACK TRACKER</small></section>
  {intro&&<div className="ow-intro" aria-hidden="true"><small>INTELLIGENCE COMMAND / BRIEFING 01</small><h2>OPERATION OVERWATCH</h2><span>ESTABLISHING UPLINK...</span></div>}
 </div>;
}
