export default function LeadCard({ lead }){
  return (
    <div style={{background:'#fff',padding:12,borderRadius:6,boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
      <div style={{fontWeight:700}}>{lead.full_name || '(No name)'}</div>
      <div style={{fontSize:13,color:'#374151'}}>{lead.email || ''}</div>
      <div style={{fontSize:13,color:'#374151'}}>{lead.phone || lead.mobile || ''}</div>
      <div style={{fontSize:12,color:'#6b7280',marginTop:6}}>{lead.source}</div>
    </div>
  );
}
