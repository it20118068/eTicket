package com.sliit.eticket;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;


import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;
import com.sliit.eticket.dto.TicketDto;
import com.sliit.eticket.helper.DatabaseHelper;
import com.sliit.eticket.service.DataGenerator;
import com.sliit.eticket.service.i.ReservationService;
import com.sliit.eticket.util.TicketAdapter;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link MyBookingsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
/**
 *  View All Bookings Fragment
 * */
public class MyBookingsFragment extends Fragment {
    private ListView listView;

    public List<TicketDto> ticketList;


    private DatabaseHelper databaseHelper;
    private static final String BASE_URL = "http://10.0.2.2:7211/api/";
    private ReservationService reservationService;
    private String nic,id,token;






    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;



    public MyBookingsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment HomeFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static MyBookingsFragment newInstance(String param1, String param2) {
        MyBookingsFragment fragment = new MyBookingsFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_my_bookings, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        listView = (ListView) getView().findViewById(R.id.ticket_list);

        databaseHelper = new DatabaseHelper(getActivity());
        ticketList = new ArrayList<TicketDto>();

        fetchDetails();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        reservationService = retrofit.create(ReservationService.class);

        RequestDto requestDto = new RequestDto();
        requestDto.setNic(nic);
        Call<ResponseDto> call = reservationService.getTicketsByNIC("Bearer " + token, requestDto);

        // Make an api call to fetch data
        call.enqueue(new Callback<ResponseDto>() {
            @Override
            public void onResponse(Call<ResponseDto> call, Response<ResponseDto> response) {
                if(response != null && response.body() != null ){
                    ticketList = response.body().getTicketDTOs();
                    TicketAdapter ticketAdapter = new TicketAdapter(getActivity(),R.layout.single_ticket, ticketList);

                    listView.setAdapter(ticketAdapter);

                    listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                            TicketDto ticket = ticketList.get(i);

                            Intent intent = new Intent(getActivity(), ViewReservationActivity.class);

                            intent.putExtra("TICKET", ticket);

                            startActivity(intent);

                        }
                    });
                }else{
                    Toast.makeText(getActivity(),"Records not found",Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseDto> call, Throwable t) {
                Toast.makeText(getActivity(),t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });





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
            this.token = cursor.getString(tokenIndex);
            this.id = cursor.getString(idIndex);
        }

        if (cursor != null) {
            cursor.close();
        }

        db.close();
    }


}