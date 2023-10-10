package com.sliit.eticket;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;
import com.sliit.eticket.dto.TicketDto;
import com.sliit.eticket.enums.CommonStatus;
import com.sliit.eticket.helper.DatabaseHelper;
import com.sliit.eticket.service.i.ReservationService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 *  View Reservation Activity
 * */
public class ViewReservationActivity extends AppCompatActivity {

    private TicketDto ticket;

    private TextView from, to, train, departAt, arrivalAt, pricePerTicket, noOfTickets, total, reservedDate, status;
    private Button modifyBtn, cancelBtn;

    Context context;

    CommonStatus[] commonStatus;

    private DatabaseHelper databaseHelper;
    private String nic,id,token;
    private boolean isLogged;
    private ReservationService reservationService;
    private static final String BASE_URL = "http://10.0.2.2:7211/api/";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_reservation);
        context = this;

        databaseHelper = new DatabaseHelper(this);
        fetchDetails();

        commonStatus = CommonStatus.values();
        Intent intent = getIntent();

        ticket = (TicketDto) intent.getSerializableExtra("TICKET");

        from = findViewById(R.id.ticket_from);
        to = findViewById(R.id.ticket_to);
        train = findViewById(R.id.ticket_train);
        departAt = findViewById(R.id.ticket_departAt);
        arrivalAt = findViewById(R.id.ticket_arrivalAt);
        pricePerTicket = findViewById(R.id.ticket_pricePerTicket);
        noOfTickets = findViewById(R.id.ticket_noOfTickets);
        total = findViewById(R.id.ticket_total);
        reservedDate = findViewById(R.id.ticket_reservedDate);
        status = findViewById((R.id.ticket_status));

        cancelBtn = findViewById(R.id.btn_cancel);
        modifyBtn = findViewById(R.id.btn_confirm);
        status.setText(commonStatus[ticket.getStatus()].name());
        if(ticket.getStatus() == 0){
            cancelBtn.setVisibility(View.VISIBLE);
            modifyBtn.setVisibility(View.VISIBLE);
        }

        from.setText(ticket.getSchedule().getStartPoint());
        to.setText(ticket.getSchedule().getEndPoint());
        train.setText(ticket.getSchedule().getTrain().getTrainName());
        departAt.setText(ticket.getSchedule().getStartingTime());
        arrivalAt.setText(ticket.getSchedule().getArrivalTime());
        pricePerTicket.setText("Rs. " + String.valueOf(ticket.getSchedule().getTicketPrice()));
        noOfTickets.setText(String.valueOf(ticket.getNoOfReservations()));
        total.setText("Rs. " + String.valueOf(ticket.getTotAmount()));
        reservedDate.setText(ticket.getReservationDate().toString());

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        reservationService = retrofit.create(ReservationService.class);


    }

    //Handle back button click
    public void handleBack(View view) {
        this.finish();
    }

    // Handle cancel booking
    public void handleCancelBooking(View view){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Cancel Reservation");

        builder.setMessage("Are you sure you want to cancel your reservation?");

        builder.setNegativeButton("Confirm", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {

                RequestDto requestDto = new RequestDto();
                ticket.setStatus(2);
                requestDto.setTicketDto(ticket);

                Call<ResponseDto> call = reservationService.updateReservationById("Bearer " + token, requestDto);

                // Make and api call to update the status
                call.enqueue(new Callback<ResponseDto>() {
                    @Override
                    public void onResponse(Call<ResponseDto> call, Response<ResponseDto> response) {
                        if(response != null && response.body().isSuccess()){
                            Toast.makeText(context, "Reservation Cancelled Successfully",Toast.LENGTH_LONG).show();
                            startActivity(new Intent(context, MainActivity.class));
                        } else {
                            Toast.makeText(context, "Something went wrong, please try again.",Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseDto> call, Throwable t) {
                        Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
                    }
                });

            }
        });

        builder.setPositiveButton("Close", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.cancel();
            }
        });


        builder.show();
    }

    // fetch required data from local DB
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

    // handle modify reservation button click
    public void handleModify(View view) {
        Intent i = new Intent(this, ModifyReservationActivity.class);
        i.putExtra("TICKET", ticket);
        startActivity(i);
    }
}