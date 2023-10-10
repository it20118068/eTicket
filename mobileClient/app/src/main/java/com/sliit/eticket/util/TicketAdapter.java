package com.sliit.eticket.util;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.sliit.eticket.R;
import com.sliit.eticket.dto.TicketDto;
import com.sliit.eticket.enums.CommonStatus;

import java.util.List;

/*
 *  Custom adapter to create ticket list
 * */
public class TicketAdapter extends ArrayAdapter<TicketDto> {
    private Context context;
    private int resource;
    List<TicketDto> ticketList;

    CommonStatus[] commonStatus;


    public TicketAdapter(Context context, int resource, List<TicketDto> ticketList) {
        super(context, resource, ticketList);
        this.context = context;
        this.resource = resource;
        this.ticketList = ticketList;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater inflater = LayoutInflater.from(context);
        commonStatus = CommonStatus.values();
        View row = inflater.inflate(resource,parent,false);

        TextView ticketId = row.findViewById(R.id.lbl_ticketId);
        TextView status = row.findViewById(R.id.lbl_status);
        TextView route = row.findViewById(R.id.lbl_route);

        TicketDto ticket = ticketList.get(position);
        ticketId.setText("Ticket Id : #" + ticket.get_id().toString().substring(0, 5));
        status.setText(commonStatus[ticket.getStatus()].name());
        route.setText(ticket.getSchedule().getStartPoint() + " to " + ticket.getSchedule().getEndPoint());

        return row;
    }
}
