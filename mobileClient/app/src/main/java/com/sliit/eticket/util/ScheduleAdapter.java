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
import com.sliit.eticket.dto.ScheduleDto;

import java.util.List;

/*
 *  Custom adapter to create Scheduler list
 * */
public class ScheduleAdapter extends ArrayAdapter<ScheduleDto> {

    private Context context;
    private int resource;
    List<ScheduleDto> scheduleList;

    public ScheduleAdapter(@NonNull Context context, int resource, List<ScheduleDto> scheduleList) {
        super(context, resource, scheduleList);
        this.context = context;
        this.resource = resource;
        this.scheduleList = scheduleList;
    }


    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View row = inflater.inflate(resource,parent,false);

        TextView scheduleName = row.findViewById(R.id.lbl_ScheduleName);
        TextView train = row.findViewById(R.id.lbl_train);
        TextView departingAt = row.findViewById(R.id.lbl_departingTime);

        ScheduleDto schedule = scheduleList.get(position);

        scheduleName.setText(schedule.getStartPoint() + " To " + schedule.getEndPoint());
        train.setText(schedule.getTrain().getTrainName());
        departingAt.setText("Departing At : " + schedule.getStartingTime());

        return row;
    }
}
