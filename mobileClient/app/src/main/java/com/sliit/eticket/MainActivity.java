package com.sliit.eticket;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;

import com.sliit.eticket.databinding.ActivityMainBinding;

/*
 *  Main Activity
 * */
public class MainActivity extends AppCompatActivity {

    ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        replaceFragment(new MyBookingsFragment());

        // Binding bottom Navigation bar
        binding.bottomNavigationView.setOnItemSelectedListener(item -> {

            int itemId = item.getItemId();

            if (itemId == R.id.myBookings) {
                replaceFragment(new MyBookingsFragment());
            } else if (itemId == R.id.profile) {
                replaceFragment(new ProfileFragment());
            } else if (itemId == R.id.schedules) {
                replaceFragment(new ScheduleFragment());
            }

            return true;
        });
    }

    private void replaceFragment(Fragment fragment){
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frame_layout, fragment);
        fragmentTransaction.commit();
    }
}