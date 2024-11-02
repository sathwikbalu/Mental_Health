import React from "react";
import { Play, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface YogaVideo {
  id: string;
  title: string;
  duration: string;
  level: string;
  thumbnail: string;
  videoUrl: string;
  instructor: string;
  category: string;
}

const yogaVideos: YogaVideo[] = [
  {
    id: "1",
    title: "Morning Yoga Flow",
    duration: "20 min",
    level: "Beginner",
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/sTANio_2E0Q",
    instructor: "Sarah Johnson",
    category: "Morning Practice",
  },
  {
    id: "2",
    title: "Stress Relief Yoga",
    duration: "15 min",
    level: "All Levels",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/hJbRpHZr_d0",
    instructor: "Michael Chen",
    category: "Stress Relief",
  },
  {
    id: "3",
    title: "Bedtime Yoga Sequence",
    duration: "10 min",
    level: "Beginner",
    thumbnail:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/BiWDsfZ3zbo",
    instructor: "Emma Wilson",
    category: "Evening Practice",
  },
  {
    id: "4",
    title: "Power Yoga Flow",
    duration: "30 min",
    level: "Advanced",
    thumbnail:
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/9kOCY0KNByw",
    instructor: "David Miller",
    category: "Power Yoga",
  },
  {
    id: "5",
    title: "Gentle Stretching",
    duration: "25 min",
    level: "Beginner",
    thumbnail:
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
    instructor: "Lisa Anderson",
    category: "Gentle Practice",
  },
  {
    id: "6",
    title: "Core Strength Yoga",
    duration: "20 min",
    level: "Intermediate",
    thumbnail:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/3HuTxEwcVEI",
    instructor: "Alex Thompson",
    category: "Core Focus",
  },
];

export const YogaPage = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<YogaVideo | null>(
    null
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Yoga Practice
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find balance and inner peace with our curated yoga sessions
        </p>
      </div>

      {selectedVideo && (
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedVideo.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedVideo.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{selectedVideo.level}</span>
                </div>
                <div>
                  <span className="font-medium">Instructor:</span>{" "}
                  {selectedVideo.instructor}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {yogaVideos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div
              className="relative h-48 bg-cover bg-center group"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white rounded-full p-4 transform hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 text-indigo-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {video.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{video.level}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
