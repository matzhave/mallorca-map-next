import { View, Text, ScrollView } from 'react-native';
import { supabase } from '@repo/supabase';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 mb-4">
          Willkommen bei Mallorca Map
        </Text>

        <Text className="text-lg text-gray-600 mb-8">
          Dein umfassender Guide für Mallorca
        </Text>

        <View className="space-y-4">
          <View className="bg-primary p-6 rounded-lg">
            <Text className="text-xl font-semibold text-white mb-2">
              Erlebnisse & Touren
            </Text>
            <Text className="text-white/90">
              Entdecke unvergessliche Aktivitäten
            </Text>
          </View>

          <View className="bg-primary p-6 rounded-lg">
            <Text className="text-xl font-semibold text-white mb-2">
              Events & Partys
            </Text>
            <Text className="text-white/90">
              Die besten Veranstaltungen
            </Text>
          </View>

          <View className="bg-secondary p-6 rounded-lg">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Guide
            </Text>
            <Text className="text-gray-700">
              Restaurants, Strände und mehr
            </Text>
          </View>
        </View>

        <View className="mt-8 p-4 bg-gray-100 rounded-lg">
          <Text className="text-sm text-gray-600 text-center">
            ✅ React Native mit Expo
          </Text>
          <Text className="text-sm text-gray-600 text-center">
            ✅ NativeWind (Tailwind CSS)
          </Text>
          <Text className="text-sm text-gray-600 text-center">
            ✅ Shared Supabase Integration
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

