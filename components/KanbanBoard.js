import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { supabase } from '../lib/supabaseClient';
import LeadCard from './LeadCard';

const columnsOrder = ['Nouveau','Connecté','Qualifié','Cité'];

export default function KanbanBoard(){
  const [columns,setColumns] = useState({});
  useEffect(() => {
    fetchLeads();
    const subscription = supabase
      .channel('public:crm.leads')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crm.leads' }, payload => {
        fetchLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  },[]);

  async function fetchLeads(){
    const { data } = await supabase.from('crm.leads').select('*').order('created_at',{ascending:false});
    const grouped = {};
    columnsOrder.forEach(c => grouped[c] = []);
    (data || []).forEach(l => {
      const s = l.status || 'Nouveau';
      if(!grouped[s]) grouped[s]=[];
      grouped[s].push(l);
    });
    setColumns(grouped);
  }

  async function onDragEnd(result){
    if(!result.destination) return;
    const { source, destination, draggableId } = result;
    const from = source.droppableId;
    const to = destination.droppableId;
    if(from === to) return;
    await supabase.from('crm.leads').update({ status: to }).eq('id', draggableId);
    fetchLeads();
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        {columnsOrder.map(col => (
          <Droppable droppableId={col} key={col}>
            {(provided)=>(
              <div ref={provided.innerRef} {...provided.droppableProps} style={{background:'#f3f4f6',padding:12,width:300,borderRadius:8}}>
                <h3 style={{fontWeight:700,marginBottom:8}}>{col} ({(columns[col]||[]).length})</h3>
                {(columns[col]||[]).map((lead, index)=>(
                  <Draggable key={lead.id} draggableId={lead.id} index={index}>
                    {(p)=>(
                      <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} style={{marginBottom:8}}>
                        <LeadCard lead={lead}/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
