package com.eagle.entertainment.config;

import com.eagle.entertainment.model.GalleryImage;
import com.eagle.entertainment.model.Service;
import com.eagle.entertainment.model.Testimonial;
import com.eagle.entertainment.repository.GalleryImageRepository;
import com.eagle.entertainment.repository.ServiceRepository;
import com.eagle.entertainment.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private ServiceRepository serviceRepository;
    @Autowired private GalleryImageRepository galleryImageRepository;
    @Autowired private TestimonialRepository testimonialRepository;

    @Override
    public void run(String... args) {
        if (serviceRepository.count() == 0) {
            serviceRepository.save(new Service(null, "Wedding Events", "We craft your perfect wedding day with elegance and precision. From intimate ceremonies to grand celebrations, every detail is handled with love.", "💍", null, true, 1));
            serviceRepository.save(new Service(null, "Corporate Events", "Professional corporate event management — conferences, product launches, team-building activities, and annual meets executed flawlessly.", "🏢", null, true, 2));
            serviceRepository.save(new Service(null, "Birthday Parties", "Celebrate life's milestones with stunning birthday setups, themes, entertainment, and catering to make every moment magical.", "🎂", null, true, 3));
            serviceRepository.save(new Service(null, "Cultural Events", "Vibrant cultural programs, music festivals, and traditional celebrations managed with authentic flair and modern execution.", "🎭", null, true, 4));
            serviceRepository.save(new Service(null, "Concert & Shows", "Live concerts, stand-up shows, and live performances — stage setup, sound, lighting, artist coordination — all under one roof.", "🎤", null, true, 5));
            serviceRepository.save(new Service(null, "Private Parties", "Exclusive private parties tailored to your vision. We handle venue decoration, catering, entertainment, and every surprise element.", "🥂", null, true, 6));
        }

        if (testimonialRepository.count() == 0) {
            testimonialRepository.save(new Testimonial(null, "Priya Sharma", "Bride", "Chennai", "Eagle Entertainment made our wedding an absolute dream. Every single detail was perfect. Arjun and his team went above and beyond!", 5, null, true));
            testimonialRepository.save(new Testimonial(null, "Rajesh Kumar", "CEO", "TechCorp India", "Our annual corporate summit was handled with exceptional professionalism. The team managed 500+ guests seamlessly. Highly recommend!", 5, null, true));
            testimonialRepository.save(new Testimonial(null, "Meena Iyer", "Client", "Coimbatore", "My daughter's birthday was a fairytale! Every decoration, every surprise was perfect. Eagle Entertainment is truly the best in the city.", 5, null, true));
        }
    }
}
