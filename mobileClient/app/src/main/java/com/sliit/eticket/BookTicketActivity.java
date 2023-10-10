package com.sliit.eticket;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;
import com.sliit.eticket.dto.ScheduleDto;
import com.sliit.eticket.dto.TicketDto;

import com.sliit.eticket.helper.DatabaseHelper;
import com.sliit.eticket.service.i.ReservationService;

import java.text.SimpleDateFormat;

import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/*
 *  Booking Ticket Activity
 * */
public class BookTicketActivity extends AppCompatActivity {
    private DatabaseHelper databaseHelper;
    private String nic,id,token;
    private boolean isLogged;
    private ReservationService reservationService;
    private static final String BASE_URL = "http://10.0.2.2:7211/api/";
    Context context;

    ScheduleDto schedule;

    private TextView from, to, train, departAt, arrivalAt, pricePerTicket, noOfTickets, total, reservedDate;
    private int month, year, day;
    private String count;
    private long tot;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_ticket);

        databaseHelper = new DatabaseHelper(this);
        fetchDetails();

        context = this;
        Intent intent = getIntent();
        schedule = (ScheduleDto)intent.getSerializableExtra("SCHEDULE");
        count = intent.getStringExtra("PASSENGER_COUNT");
        month = intent.getIntExtra("MONTH",0);
        year = intent.getIntExtra("YEAR",0);
        day = intent.getIntExtra("DAY",0);

        from = findViewById(R.id.booking_from);
        to = findViewById(R.id.booking_to);
        train = findViewById(R.id.booking_train);
        departAt = findViewById(R.id.booking_departAt);
        arrivalAt = findViewById(R.id.booking_arrivalAt);
        pricePerTicket = findViewById(R.id.booking_pricePerTicket);
        noOfTickets = findViewById(R.id.booking_noOfTickets);
        total = findViewById(R.id.booking_total);
        reservedDate = findViewById(R.id.booking_reservedDate);

        from.setText(schedule.getStartPoint());
        to.setText(schedule.getEndPoint());
        train.setText(schedule.getTrain().getTrainName());
        departAt.setText(schedule.getStartingTime());
        arrivalAt.setText(schedule.getArrivalTime());
        pricePerTicket.setText("Rs. " + String.valueOf(schedule.getTicketPrice()));
        noOfTickets.setText(count);
        tot = schedule.getTicketPrice() * Integer.parseInt(count);
        total.setText("Rs. " + String.valueOf(tot));
        reservedDate.setText(day + "." + month +"." + year);


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        reservationService = retrofit.create(ReservationService.class);




    }

    // Handle Back button
    public void handleBack(View view) {
        this.finish();
    }

    //Handle confirm booking
    public void handleConfirm(View view){
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        try {
            String dateString = day + "." + month + "." + year;
            Date date = dateFormat.parse(dateString);

            TicketDto ticketDto = new TicketDto();
            ticketDto.set_id("");
            ticketDto.setNic(nic);
            ticketDto.setBookingDate(new Date().toString());
            ticketDto.setReservationDate(date.toString());
            ticketDto.setSchedule(schedule);
            ticketDto.setNoOfReservations(Integer.parseInt(count));
            ticketDto.setTotAmount(tot);
            ticketDto.setStatus(0);

            RequestDto requestDto = new RequestDto();
            requestDto.setTicketDto(ticketDto);

            //Make a api call to save the data
            Call<ResponseDto> call = reservationService.addReservation("Bearer " + token, requestDto);
            call.enqueue(new Callback<ResponseDto>() {
                @Override
                public void onResponse(Call<ResponseDto> call, Response<ResponseDto> response) {
                    if(response != null && response.body() != null){
                        Toast.makeText(context, "Reservation Success",Toast.LENGTH_LONG).show();
                        Intent i = new Intent(context, MainActivity.class);
                        startActivity(i);
                    } else {
                        Toast.makeText(context, "Something went wrong, please try again.",Toast.LENGTH_LONG).show();
                    }
                }

                @Override
                public void onFailure(Call<ResponseDto> call, Throwable t) {
                    Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    //Fetch required data from local DB
    private void fetchDetails (){
        SQLiteDatabase db = databaseHelper.getReadableDatabase();

        Cursor cursor = db.query(
                DatabaseHelper.TABLE_NAME,
                new String[]{DatabaseHelper.COLUMN_ID, DatabaseHelper.COLUMN_NIC, DatabaseHelper.COLUMN_LOGGED, DatabaseHelper.COLUMN_TOKEN},
                DatabaseHelper.COLUMN_ID + " = ?",
                new String[]{String.valueOf(1)},
                null,
                null,
                null
        );

        AppUserDto appUser = null;

        if (cursor != null && cursor.moveToFirst()) {
            int nicIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_NIC);
            int loggedIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_LOGGED);
            int tokenIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_TOKEN);
            int idIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_ID);



            this.nic = cursor.getString(nicIndex);
            this.isLogged = cursor.getInt(loggedIndex) == 1;
            this.token = cursor.getString(tokenIndex);
            this.id = cursor.getString(idIndex);
        }

        if (cursor != null) {
            cursor.close();
        }

        db.close();
    }
}