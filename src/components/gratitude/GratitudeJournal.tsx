import React, { useEffect } from "react";
import { format } from "date-fns";
import { Heart, Calendar, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import type { GratitudeEntry } from "../../types";

export const GratitudeJournal = () => {
  const [entries, setEntries] = React.useState<GratitudeEntry[]>([]);
  const [newEntry, setNewEntry] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gratitude");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching gratitude entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/gratitude", {
        content: newEntry.trim(),
      });

      setEntries([response.data, ...entries]);
      setNewEntry("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving gratitude entry:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gratitude Journal
        </h1>
        <p className="text-lg text-gray-600">
          Take a moment to reflect on what you're grateful for today
        </p>
      </div>

      <div className="mb-8">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full bg-white rounded-xl shadow-md p-6 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Entry
          </button>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
            onSubmit={handleSubmit}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are you grateful for today?
            </label>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              placeholder="I'm grateful for..."
              autoFocus
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </motion.form>
        )}
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(entry.date), "MMMM d, yyyy")}</span>
              </div>
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
