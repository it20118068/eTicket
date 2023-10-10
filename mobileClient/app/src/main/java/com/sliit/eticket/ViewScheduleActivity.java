package com.sliit.eticket;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;


import com.sliit.eticket.dto.ScheduleDto;

import java.io.Console;
import java.util.Date;

/**
 *  View Schedule Activity
 * */
public class ViewScheduleActivity extends AppCompatActivity {

    private TextView startPoint, endPoint, trainName, departingTime, arrivalTime, price;
    ScheduleDto schedule;

    Context context;

    String passengerCount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_schedule);

        context = this;

        startPoint = findViewById(R.id.startPoint);
        endPoint = findViewById(R.id.endPoint);
        trainName = findViewById(R.id.schedule_train_name);
        departingTime = findViewById(R.id.schedulule_departing_at);
        arrivalTime = findViewById(R.id.schedulule_arrival_at);
        price = findViewById(R.id.schedulule_price);

        Intent intent = getIntent();
        schedule = (ScheduleDto)intent.getSerializableExtra("SCHEDULE");

        startPoint.setText(schedule.getStartPoint());
        endPoint.setText(schedule.getEndPoint());
        trainName.setText(schedule.getTrain().getTrainName());
        departingTime.setText("Departing at : " + schedule.getStartingTime());
        arrivalTime.setText("Arrival at : " + schedule.getArrivalTime());
        price.setText("Rs. " + schedule.getTicketPrice());

    }

    // handle back button click
    public void handleBack(View view) {
        this.finish();
    }

    // handle book no button click
    public void handleBookNow(View view) {


        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        final EditText noOfPassengers = new EditText(ViewScheduleActivity.this);


        builder.setTitle("Enter no of passengers");
        builder.setMessage("NOTE: Maximum passenger count is 4.");
        builder.setView(noOfPassengers);

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(150,20,150,20);
        layout.addView(noOfPassengers); // displays the user input bar
        builder.setView(layout);

        builder.setPositiveButton("Continue", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                passengerCount = noOfPassengers.getText().toString();


                AlertDialog.Builder dateBuilder = new AlertDialog.Builder(context);
                final DatePicker reservationDate = new DatePicker(ViewScheduleActivity.this);

                dateBuilder.setTitle("Reservation Date");
                dateBuilder.setView(reservationDate);

                LinearLayout layout = new LinearLayout(context);
                layout.setOrientation(LinearLayout.VERTICAL);
                layout.setPadding(150,20,150,20);
                layout.addView(reservationDate); // displays the user input bar
                dateBuilder.setView(layout);


                dateBuilder.setPositiveButton("Continue", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Intent intent = new Intent(context, BookTicketActivity.class);
                        intent.putExtra("SCHEDULE",schedule);
                        intent.putExtra("PASSENGER_COUNT", passengerCount);
                        intent.putExtra("MONTH", reservationDate.getMonth());
                        intent.putExtra("YEAR", reservationDate.getYear());
                        intent.putExtra("DAY", reservationDate.getDayOfMonth());
                        startActivity(intent);
                    }
                });

                dateBuilder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        dialogInterface.cancel();
                    }
                });

                dateBuilder.show();


            }
        });

        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.cancel();
            }
        });

        builder.show();



    }
}