export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_events_2024_01: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_events_2024_02: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_addon_purchases: {
        Row: {
          active_from: string | null
          active_to: string | null
          addon_key: string
          business_profile_id: string
          created_at: string | null
          currency: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          price_paid_cents: number
          scheduled_start_at: string | null
          status: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          active_from?: string | null
          active_to?: string | null
          addon_key: string
          business_profile_id: string
          created_at?: string | null
          currency?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          price_paid_cents: number
          scheduled_start_at?: string | null
          status?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          active_from?: string | null
          active_to?: string | null
          addon_key?: string
          business_profile_id?: string
          created_at?: string | null
          currency?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          price_paid_cents?: number
          scheduled_start_at?: string | null
          status?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_addon_purchases_addon_key_fkey"
            columns: ["addon_key"]
            isOneToOne: false
            referencedRelation: "business_addons"
            referencedColumns: ["addon_key"]
          },
          {
            foreignKeyName: "business_addon_purchases_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_addons: {
        Row: {
          addon_key: string
          addon_type: string
          base_price_cents: number
          created_at: string | null
          currency: string | null
          description: string | null
          duration_days: number | null
          is_active: boolean | null
          metadata: Json | null
          name: string
          sort_order: number | null
          stripe_price_id: string | null
          updated_at: string | null
        }
        Insert: {
          addon_key: string
          addon_type: string
          base_price_cents: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration_days?: number | null
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          sort_order?: number | null
          stripe_price_id?: string | null
          updated_at?: string | null
        }
        Update: {
          addon_key?: string
          addon_type?: string
          base_price_cents?: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration_days?: number | null
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          sort_order?: number | null
          stripe_price_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      business_claim_documents: {
        Row: {
          claim_id: string
          created_at: string | null
          created_by: string | null
          document_type: string
          file_name: string
          file_size_bytes: number
          id: string
          metadata: Json | null
          mime_type: string
          phash: string | null
          sha256_hash: string | null
          storage_bucket: string | null
          storage_path: string
        }
        Insert: {
          claim_id: string
          created_at?: string | null
          created_by?: string | null
          document_type: string
          file_name: string
          file_size_bytes: number
          id?: string
          metadata?: Json | null
          mime_type: string
          phash?: string | null
          sha256_hash?: string | null
          storage_bucket?: string | null
          storage_path: string
        }
        Update: {
          claim_id?: string
          created_at?: string | null
          created_by?: string | null
          document_type?: string
          file_name?: string
          file_size_bytes?: number
          id?: string
          metadata?: Json | null
          mime_type?: string
          phash?: string | null
          sha256_hash?: string | null
          storage_bucket?: string | null
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_claim_documents_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "business_claims"
            referencedColumns: ["id"]
          },
        ]
      }
      business_claims: {
        Row: {
          approved_at: string | null
          business_profile_id: string
          cancelled_at: string | null
          claim_fee_cents: number | null
          created_at: string | null
          id: string
          payment_status: string | null
          place_id: string
          rejected_at: string | null
          status: string | null
          step_1_data: Json | null
          step_2_data: Json | null
          step_3_data: Json | null
          step_4_data: Json | null
          step_5_data: Json | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          submitted_at: string | null
          updated_at: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          approved_at?: string | null
          business_profile_id: string
          cancelled_at?: string | null
          claim_fee_cents?: number | null
          created_at?: string | null
          id?: string
          payment_status?: string | null
          place_id: string
          rejected_at?: string | null
          status?: string | null
          step_1_data?: Json | null
          step_2_data?: Json | null
          step_3_data?: Json | null
          step_4_data?: Json | null
          step_5_data?: Json | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          approved_at?: string | null
          business_profile_id?: string
          cancelled_at?: string | null
          claim_fee_cents?: number | null
          created_at?: string | null
          id?: string
          payment_status?: string | null
          place_id?: string
          rejected_at?: string | null
          status?: string | null
          step_1_data?: Json | null
          step_2_data?: Json | null
          step_3_data?: Json | null
          step_4_data?: Json | null
          step_5_data?: Json | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_claims_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_claims_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      business_plan_features: {
        Row: {
          created_at: string | null
          feature_key: string
          feature_value: Json | null
          id: string
          is_enabled: boolean | null
          plan_key: string
        }
        Insert: {
          created_at?: string | null
          feature_key: string
          feature_value?: Json | null
          id?: string
          is_enabled?: boolean | null
          plan_key: string
        }
        Update: {
          created_at?: string | null
          feature_key?: string
          feature_value?: Json | null
          id?: string
          is_enabled?: boolean | null
          plan_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_plan_features_plan_key_fkey"
            columns: ["plan_key"]
            isOneToOne: false
            referencedRelation: "business_plans"
            referencedColumns: ["plan_key"]
          },
        ]
      }
      business_plans: {
        Row: {
          annual_price_cents: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          is_active: boolean | null
          is_recommended: boolean | null
          metadata: Json | null
          monthly_price_cents: number
          name: string
          plan_key: string
          sort_order: number | null
          stripe_price_id_annual: string | null
          stripe_price_id_monthly: string | null
          updated_at: string | null
        }
        Insert: {
          annual_price_cents?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          is_active?: boolean | null
          is_recommended?: boolean | null
          metadata?: Json | null
          monthly_price_cents: number
          name: string
          plan_key: string
          sort_order?: number | null
          stripe_price_id_annual?: string | null
          stripe_price_id_monthly?: string | null
          updated_at?: string | null
        }
        Update: {
          annual_price_cents?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          is_active?: boolean | null
          is_recommended?: boolean | null
          metadata?: Json | null
          monthly_price_cents?: number
          name?: string
          plan_key?: string
          sort_order?: number | null
          stripe_price_id_annual?: string | null
          stripe_price_id_monthly?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          address: string | null
          city: string | null
          company_name: string | null
          contact_name: string | null
          country: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          metadata: Json | null
          onboarding_completed_at: string | null
          phone: string | null
          postal_code: string | null
          status: string | null
          stripe_customer_id: string | null
          tax_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          metadata?: Json | null
          onboarding_completed_at?: string | null
          phone?: string | null
          postal_code?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          metadata?: Json | null
          onboarding_completed_at?: string | null
          phone?: string | null
          postal_code?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      business_subscriptions: {
        Row: {
          billing_interval: string
          business_profile_id: string
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string | null
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          metadata: Json | null
          plan_key: string
          price_cents: number
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          stripe_subscription_item_id: string | null
          trial_end: string | null
          trial_start: string | null
          updated_at: string | null
        }
        Insert: {
          billing_interval: string
          business_profile_id: string
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          metadata?: Json | null
          plan_key: string
          price_cents: number
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_subscription_item_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_interval?: string
          business_profile_id?: string
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          metadata?: Json | null
          plan_key?: string
          price_cents?: number
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_subscription_item_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_subscriptions_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_subscriptions_plan_key_fkey"
            columns: ["plan_key"]
            isOneToOne: false
            referencedRelation: "business_plans"
            referencedColumns: ["plan_key"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name_de: string
          name_en: string
          name_es: string
          parent_id: string | null
          slug: string
          slug_de: string
          slug_en: string
          slug_es: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_de: string
          name_en: string
          name_es: string
          parent_id?: string | null
          slug: string
          slug_de: string
          slug_en: string
          slug_es: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_de?: string
          name_en?: string
          name_es?: string
          parent_id?: string | null
          slug?: string
          slug_de?: string
          slug_en?: string
          slug_es?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      classifieds: {
        Row: {
          category_id: string
          city: string | null
          condition: string | null
          contact_count: number | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          coordinates: unknown | null
          created_at: string | null
          currency: string | null
          description: string
          expires_at: string
          featured_until: string | null
          id: string
          images: Json | null
          is_featured: boolean | null
          is_negotiable: boolean | null
          latitude: number | null
          location_name: string | null
          longitude: number | null
          postal_code: string | null
          price: number
          primary_image_url: string | null
          show_email: boolean | null
          show_phone: boolean | null
          slug: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
          view_count: number | null
        }
        Insert: {
          category_id: string
          city?: string | null
          condition?: string | null
          contact_count?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          currency?: string | null
          description: string
          expires_at: string
          featured_until?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          is_negotiable?: boolean | null
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          postal_code?: string | null
          price: number
          primary_image_url?: string | null
          show_email?: boolean | null
          show_phone?: boolean | null
          slug?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          view_count?: number | null
        }
        Update: {
          category_id?: string
          city?: string | null
          condition?: string | null
          contact_count?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          currency?: string | null
          description?: string
          expires_at?: string
          featured_until?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          is_negotiable?: boolean | null
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          postal_code?: string | null
          price?: number
          primary_image_url?: string | null
          show_email?: boolean | null
          show_phone?: boolean | null
          slug?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "classifieds_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      community: {
        Row: {
          address: string | null
          category_id: string
          city: string | null
          coordinates: unknown | null
          cover_image_url: string | null
          created_at: string | null
          description: string
          id: string
          images: Json | null
          is_active: boolean | null
          is_private: boolean | null
          is_verified: boolean | null
          join_click_count: number | null
          join_url: string | null
          language: string | null
          latitude: number | null
          location_name: string | null
          logo_url: string | null
          longitude: number | null
          member_count: number | null
          next_meeting_at: string | null
          schedule: Json | null
          slug: string | null
          social_media: Json | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
          view_count: number | null
          website: string | null
        }
        Insert: {
          address?: string | null
          category_id: string
          city?: string | null
          coordinates?: unknown | null
          cover_image_url?: string | null
          created_at?: string | null
          description: string
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_private?: boolean | null
          is_verified?: boolean | null
          join_click_count?: number | null
          join_url?: string | null
          language?: string | null
          latitude?: number | null
          location_name?: string | null
          logo_url?: string | null
          longitude?: number | null
          member_count?: number | null
          next_meeting_at?: string | null
          schedule?: Json | null
          slug?: string | null
          social_media?: Json | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
          view_count?: number | null
          website?: string | null
        }
        Update: {
          address?: string | null
          category_id?: string
          city?: string | null
          coordinates?: unknown | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_private?: boolean | null
          is_verified?: boolean | null
          join_click_count?: number | null
          join_url?: string | null
          language?: string | null
          latitude?: number | null
          location_name?: string | null
          logo_url?: string | null
          longitude?: number | null
          member_count?: number | null
          next_meeting_at?: string | null
          schedule?: Json | null
          slug?: string | null
          social_media?: Json | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
          view_count?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_tags: {
        Row: {
          added_at: string | null
          added_by: string | null
          entity_id: string
          entity_type: string
          id: string
          tag_id: string
        }
        Insert: {
          added_at?: string | null
          added_by?: string | null
          entity_id: string
          entity_type: string
          id?: string
          tag_id: string
        }
        Update: {
          added_at?: string | null
          added_by?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          all_day: boolean | null
          booking_url: string | null
          category_id: string
          click_count: number | null
          coordinates: unknown | null
          created_at: string | null
          created_by_business_id: string | null
          currency: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          end_date: string | null
          end_time: string | null
          external_id: string | null
          external_source: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          is_featured: boolean | null
          is_free: boolean | null
          latitude: number | null
          location_address: string | null
          location_name: string | null
          longitude: number | null
          place_id: string | null
          price_from: number | null
          price_to: number | null
          primary_image_url: string | null
          rating: number | null
          recurrence: Json | null
          review_count: number | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          start_date: string
          start_time: string | null
          title: string
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          all_day?: boolean | null
          booking_url?: string | null
          category_id: string
          click_count?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          created_by_business_id?: string | null
          currency?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          end_date?: string | null
          end_time?: string | null
          external_id?: string | null
          external_source?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_free?: boolean | null
          latitude?: number | null
          location_address?: string | null
          location_name?: string | null
          longitude?: number | null
          place_id?: string | null
          price_from?: number | null
          price_to?: number | null
          primary_image_url?: string | null
          rating?: number | null
          recurrence?: Json | null
          review_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          start_date: string
          start_time?: string | null
          title: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          all_day?: boolean | null
          booking_url?: string | null
          category_id?: string
          click_count?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          created_by_business_id?: string | null
          currency?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          end_date?: string | null
          end_time?: string | null
          external_id?: string | null
          external_source?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_free?: boolean | null
          latitude?: number | null
          location_address?: string | null
          location_name?: string | null
          longitude?: number | null
          place_id?: string | null
          price_from?: number | null
          price_to?: number | null
          primary_image_url?: string | null
          rating?: number | null
          recurrence?: Json | null
          review_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          start_date?: string
          start_time?: string | null
          title?: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          booking_count: number | null
          booking_url: string
          category_id: string
          commission_rate: number | null
          coordinates: unknown | null
          created_at: string | null
          currency: string | null
          departure_point: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          difficulty: string | null
          duration_hours: number | null
          duration_text: string | null
          id: string
          images: Json | null
          includes_equipment: boolean | null
          includes_guide: boolean | null
          includes_meals: boolean | null
          includes_transport: boolean | null
          is_active: boolean | null
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          max_age: number | null
          max_group_size: number | null
          min_age: number | null
          price_from: number | null
          primary_image_url: string | null
          provider: string
          provider_product_code: string | null
          rating: number | null
          review_count: number | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          suitable_for_children: boolean | null
          title: string
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          view_count: number | null
          wheelchair_accessible: boolean | null
        }
        Insert: {
          booking_count?: number | null
          booking_url: string
          category_id: string
          commission_rate?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          currency?: string | null
          departure_point?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          difficulty?: string | null
          duration_hours?: number | null
          duration_text?: string | null
          id?: string
          images?: Json | null
          includes_equipment?: boolean | null
          includes_guide?: boolean | null
          includes_meals?: boolean | null
          includes_transport?: boolean | null
          is_active?: boolean | null
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          max_age?: number | null
          max_group_size?: number | null
          min_age?: number | null
          price_from?: number | null
          primary_image_url?: string | null
          provider: string
          provider_product_code?: string | null
          rating?: number | null
          review_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          suitable_for_children?: boolean | null
          title: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
          wheelchair_accessible?: boolean | null
        }
        Update: {
          booking_count?: number | null
          booking_url?: string
          category_id?: string
          commission_rate?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          currency?: string | null
          departure_point?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          difficulty?: string | null
          duration_hours?: number | null
          duration_text?: string | null
          id?: string
          images?: Json | null
          includes_equipment?: boolean | null
          includes_guide?: boolean | null
          includes_meals?: boolean | null
          includes_transport?: boolean | null
          is_active?: boolean | null
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          max_age?: number | null
          max_group_size?: number | null
          min_age?: number | null
          price_from?: number | null
          primary_image_url?: string | null
          provider?: string
          provider_product_code?: string | null
          rating?: number | null
          review_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          suitable_for_children?: boolean | null
          title?: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
          wheelchair_accessible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          address: string | null
          application_count: number | null
          application_email: string | null
          application_url: string | null
          category_id: string
          city: string | null
          company_logo_url: string | null
          company_name: string
          company_website: string | null
          coordinates: unknown | null
          created_at: string | null
          description: string
          employment_type: string | null
          experience_level: string | null
          expires_at: string
          external_id: string | null
          external_source: string | null
          featured_until: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          job_type: string
          latitude: number | null
          location_name: string | null
          longitude: number | null
          postal_code: string | null
          posted_by_business_id: string | null
          posted_by_user_id: string | null
          remote_possible: boolean | null
          salary_currency: string | null
          salary_from: number | null
          salary_period: string | null
          salary_to: number | null
          salary_visible: boolean | null
          slug: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          address?: string | null
          application_count?: number | null
          application_email?: string | null
          application_url?: string | null
          category_id: string
          city?: string | null
          company_logo_url?: string | null
          company_name: string
          company_website?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          description: string
          employment_type?: string | null
          experience_level?: string | null
          expires_at: string
          external_id?: string | null
          external_source?: string | null
          featured_until?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          job_type: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          postal_code?: string | null
          posted_by_business_id?: string | null
          posted_by_user_id?: string | null
          remote_possible?: boolean | null
          salary_currency?: string | null
          salary_from?: number | null
          salary_period?: string | null
          salary_to?: number | null
          salary_visible?: boolean | null
          slug?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          address?: string | null
          application_count?: number | null
          application_email?: string | null
          application_url?: string | null
          category_id?: string
          city?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_website?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string
          employment_type?: string | null
          experience_level?: string | null
          expires_at?: string
          external_id?: string | null
          external_source?: string | null
          featured_until?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          job_type?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          postal_code?: string | null
          posted_by_business_id?: string | null
          posted_by_user_id?: string | null
          remote_possible?: boolean | null
          salary_currency?: string | null
          salary_from?: number | null
          salary_period?: string | null
          salary_to?: number | null
          salary_visible?: boolean | null
          slug?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_name: string | null
          category_id: string | null
          content_de: string | null
          content_en: string | null
          content_es: string | null
          created_at: string | null
          external_id: string | null
          featured_image_url: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          is_featured: boolean | null
          published_at: string
          share_count: number | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          source_name: string | null
          source_url: string | null
          summary_de: string | null
          summary_en: string | null
          summary_es: string | null
          title_de: string
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          created_at?: string | null
          external_id?: string | null
          featured_image_url?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          published_at?: string
          share_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          source_name?: string | null
          source_url?: string | null
          summary_de?: string | null
          summary_en?: string | null
          summary_es?: string | null
          title_de: string
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          created_at?: string | null
          external_id?: string | null
          featured_image_url?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          published_at?: string
          share_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          source_name?: string | null
          source_url?: string | null
          summary_de?: string | null
          summary_en?: string | null
          summary_es?: string | null
          title_de?: string
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "news_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          category_id: string
          city: string | null
          claimed: boolean | null
          claimed_at: string | null
          claimed_by: string | null
          click_count: number | null
          coordinates: unknown | null
          country: string | null
          created_at: string | null
          cuisine_type: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          email: string | null
          external_id: string | null
          external_source: string | null
          featured_until: string | null
          formatted_address: string | null
          google_place_id: string | null
          google_rating: number | null
          google_review_count: number | null
          google_reviews: Json | null
          id: string
          images: Json | null
          is_active: boolean | null
          is_featured: boolean | null
          last_synced_at: string | null
          latitude: number | null
          longitude: number | null
          meta_description_de: string | null
          meta_description_en: string | null
          meta_description_es: string | null
          meta_title_de: string | null
          meta_title_en: string | null
          meta_title_es: string | null
          opening_hours: Json | null
          phone: string | null
          postal_code: string | null
          price_level: number | null
          primary_image_url: string | null
          rating: number | null
          region: string | null
          review_count: number | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          street: string | null
          title: string
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          view_count: number | null
          website: string | null
        }
        Insert: {
          category_id: string
          city?: string | null
          claimed?: boolean | null
          claimed_at?: string | null
          claimed_by?: string | null
          click_count?: number | null
          coordinates?: unknown | null
          country?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          email?: string | null
          external_id?: string | null
          external_source?: string | null
          featured_until?: string | null
          formatted_address?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          google_review_count?: number | null
          google_reviews?: Json | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          last_synced_at?: string | null
          latitude?: number | null
          longitude?: number | null
          meta_description_de?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_de?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string | null
          price_level?: number | null
          primary_image_url?: string | null
          rating?: number | null
          region?: string | null
          review_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          street?: string | null
          title: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
          website?: string | null
        }
        Update: {
          category_id?: string
          city?: string | null
          claimed?: boolean | null
          claimed_at?: string | null
          claimed_by?: string | null
          click_count?: number | null
          coordinates?: unknown | null
          country?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          email?: string | null
          external_id?: string | null
          external_source?: string | null
          featured_until?: string | null
          formatted_address?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          google_review_count?: number | null
          google_reviews?: Json | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          last_synced_at?: string | null
          latitude?: number | null
          longitude?: number | null
          meta_description_de?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_de?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string | null
          price_level?: number | null
          primary_image_url?: string | null
          rating?: number | null
          region?: string | null
          review_count?: number | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          street?: string | null
          title?: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "places_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      review_media: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          file_name: string
          file_size_bytes: number
          height: number | null
          id: string
          media_type: string
          metadata: Json | null
          mime_type: string
          moderation_notes: string | null
          phash: string | null
          public_url: string
          review_id: string
          sha256_hash: string | null
          status: string | null
          storage_bucket: string | null
          storage_path: string
          width: number | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          file_name: string
          file_size_bytes: number
          height?: number | null
          id?: string
          media_type: string
          metadata?: Json | null
          mime_type: string
          moderation_notes?: string | null
          phash?: string | null
          public_url: string
          review_id: string
          sha256_hash?: string | null
          status?: string | null
          storage_bucket?: string | null
          storage_path: string
          width?: number | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          file_name?: string
          file_size_bytes?: number
          height?: number | null
          id?: string
          media_type?: string
          metadata?: Json | null
          mime_type?: string
          moderation_notes?: string | null
          phash?: string | null
          public_url?: string
          review_id?: string
          sha256_hash?: string | null
          status?: string | null
          storage_bucket?: string | null
          storage_path?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "review_media_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "user_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name_de: string
          name_en: string
          name_es: string
          slug: string
          sort_order: number | null
          tag_type: string | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_de: string
          name_en: string
          name_es: string
          slug: string
          sort_order?: number | null
          tag_type?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_de?: string
          name_en?: string
          name_es?: string
          slug?: string
          sort_order?: number | null
          tag_type?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          collection_name: string | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          collection_name?: string | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          collection_name?: string | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          badges: Json | null
          bio: string | null
          city: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string | null
          display_name: string | null
          favorite_count: number | null
          id: string
          is_public: boolean | null
          language: string | null
          notification_preferences: Json | null
          photo_count: number | null
          points: number | null
          review_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          display_name?: string | null
          favorite_count?: number | null
          id?: string
          is_public?: boolean | null
          language?: string | null
          notification_preferences?: Json | null
          photo_count?: number | null
          points?: number | null
          review_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          display_name?: string | null
          favorite_count?: number | null
          id?: string
          is_public?: boolean | null
          language?: string | null
          notification_preferences?: Json | null
          photo_count?: number | null
          points?: number | null
          review_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_reviews: {
        Row: {
          business_responded_at: string | null
          business_responded_by: string | null
          business_response: string | null
          comment: string | null
          created_at: string | null
          display_name: string | null
          email: string
          email_hash: string
          email_verified: boolean | null
          entity_id: string
          entity_type: string
          helpful_count: number | null
          id: string
          language: string | null
          moderated_at: string | null
          moderated_by: string | null
          moderation_notes: string | null
          not_helpful_count: number | null
          rating: number
          status: string | null
          submitter_ip: unknown | null
          title: string | null
          updated_at: string | null
          user_agent: string | null
          user_avatar_url: string | null
          user_id: string | null
          verification_token: string | null
          verified_at: string | null
        }
        Insert: {
          business_responded_at?: string | null
          business_responded_by?: string | null
          business_response?: string | null
          comment?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          email_hash: string
          email_verified?: boolean | null
          entity_id: string
          entity_type: string
          helpful_count?: number | null
          id?: string
          language?: string | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_notes?: string | null
          not_helpful_count?: number | null
          rating: number
          status?: string | null
          submitter_ip?: unknown | null
          title?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_avatar_url?: string | null
          user_id?: string | null
          verification_token?: string | null
          verified_at?: string | null
        }
        Update: {
          business_responded_at?: string | null
          business_responded_by?: string | null
          business_response?: string | null
          comment?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          email_hash?: string
          email_verified?: boolean | null
          entity_id?: string
          entity_type?: string
          helpful_count?: number | null
          id?: string
          language?: string | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_notes?: string | null
          not_helpful_count?: number | null
          rating?: number
          status?: string | null
          submitter_ip?: unknown | null
          title?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_avatar_url?: string | null
          user_id?: string | null
          verification_token?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      raster_columns: {
        Row: {
          blocksize_x: number | null
          blocksize_y: number | null
          extent: unknown | null
          nodata_values: number[] | null
          num_bands: number | null
          out_db: boolean[] | null
          pixel_types: string[] | null
          r_raster_column: unknown | null
          r_table_catalog: unknown | null
          r_table_name: unknown | null
          r_table_schema: unknown | null
          regular_blocking: boolean | null
          same_alignment: boolean | null
          scale_x: number | null
          scale_y: number | null
          spatial_index: boolean | null
          srid: number | null
        }
        Relationships: []
      }
      raster_overviews: {
        Row: {
          o_raster_column: unknown | null
          o_table_catalog: unknown | null
          o_table_name: unknown | null
          o_table_schema: unknown | null
          overview_factor: number | null
          r_raster_column: unknown | null
          r_table_catalog: unknown | null
          r_table_name: unknown | null
          r_table_schema: unknown | null
        }
        Relationships: []
      }
    }
    Functions: {
      __st_countagg_transfn: {
        Args: {
          agg: Database["public"]["CompositeTypes"]["agg_count"]
          exclude_nodata_value?: boolean
          nband?: number
          rast: unknown
          sample_percent?: number
        }
        Returns: Database["public"]["CompositeTypes"]["agg_count"]
      }
      _add_overview_constraint: {
        Args: {
          factor: number
          ovcolumn: unknown
          ovschema: unknown
          ovtable: unknown
          refcolumn: unknown
          refschema: unknown
          reftable: unknown
        }
        Returns: boolean
      }
      _add_raster_constraint: {
        Args: { cn: unknown; sql: string }
        Returns: boolean
      }
      _add_raster_constraint_alignment: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_blocksize: {
        Args: {
          axis: string
          rastcolumn: unknown
          rastschema: unknown
          rasttable: unknown
        }
        Returns: boolean
      }
      _add_raster_constraint_coverage_tile: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_extent: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_nodata_values: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_num_bands: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_out_db: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_pixel_types: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_scale: {
        Args: {
          axis: string
          rastcolumn: unknown
          rastschema: unknown
          rasttable: unknown
        }
        Returns: boolean
      }
      _add_raster_constraint_spatially_unique: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _add_raster_constraint_srid: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_overview_constraint: {
        Args: { ovcolumn: unknown; ovschema: unknown; ovtable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint: {
        Args: { cn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_alignment: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_blocksize: {
        Args: {
          axis: string
          rastcolumn: unknown
          rastschema: unknown
          rasttable: unknown
        }
        Returns: boolean
      }
      _drop_raster_constraint_coverage_tile: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_extent: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_nodata_values: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_num_bands: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_out_db: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_pixel_types: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_regular_blocking: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_scale: {
        Args: {
          axis: string
          rastcolumn: unknown
          rastschema: unknown
          rasttable: unknown
        }
        Returns: boolean
      }
      _drop_raster_constraint_spatially_unique: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_srid: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _overview_constraint: {
        Args: {
          factor: number
          ov: unknown
          refcolumn: unknown
          refschema: unknown
          reftable: unknown
        }
        Returns: boolean
      }
      _overview_constraint_info: {
        Args: { ovcolumn: unknown; ovschema: unknown; ovtable: unknown }
        Returns: Record<string, unknown>
      }
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _raster_constraint_info_alignment: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _raster_constraint_info_blocksize: {
        Args: {
          axis: string
          rastcolumn: unknown
          rastschema: unknown
          rasttable: unknown
        }
        Returns: number
      }
      _raster_constraint_info_coverage_tile: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _raster_constraint_info_extent: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: unknown
      }
      _raster_constraint_info_index: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _raster_constraint_info_nodata_values: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: number[]
      }
      _raster_constraint_info_num_bands: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: number
      }
      _raster_constraint_info_out_db: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean[]
      }
      _raster_constraint_info_pixel_types: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: string[]
      }
      _raster_constraint_info_regular_blocking: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _raster_constraint_info_scale: {
        Args: {
          axis: string
          rastcolumn: unknown
          rastschema: unknown
          rasttable: unknown
        }
        Returns: number
      }
      _raster_constraint_info_spatially_unique: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: boolean
      }
      _raster_constraint_info_srid: {
        Args: { rastcolumn: unknown; rastschema: unknown; rasttable: unknown }
        Returns: number
      }
      _raster_constraint_nodata_values: {
        Args: { rast: unknown }
        Returns: number[]
      }
      _raster_constraint_out_db: {
        Args: { rast: unknown }
        Returns: boolean[]
      }
      _raster_constraint_pixel_types: {
        Args: { rast: unknown }
        Returns: string[]
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_aspect4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_asraster: {
        Args: {
          geom: unknown
          gridx?: number
          gridy?: number
          height?: number
          nodataval?: number[]
          pixeltype?: string[]
          scalex?: number
          scaley?: number
          skewx?: number
          skewy?: number
          touched?: boolean
          upperleftx?: number
          upperlefty?: number
          value?: number[]
          width?: number
        }
        Returns: unknown
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_clip: {
        Args: {
          crop?: boolean
          geom: unknown
          nband: number[]
          nodataval?: number[]
          rast: unknown
        }
        Returns: unknown
      }
      _st_colormap: {
        Args: {
          colormap: string
          method?: string
          nband: number
          rast: unknown
        }
        Returns: unknown
      }
      _st_contains: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_convertarray4ma: {
        Args: { value: number[] }
        Returns: number[]
      }
      _st_count: {
        Args: {
          exclude_nodata_value?: boolean
          nband?: number
          rast: unknown
          sample_percent?: number
        }
        Returns: number
      }
      _st_countagg_finalfn: {
        Args: { agg: Database["public"]["CompositeTypes"]["agg_count"] }
        Returns: number
      }
      _st_countagg_transfn: {
        Args:
          | {
              agg: Database["public"]["CompositeTypes"]["agg_count"]
              exclude_nodata_value: boolean
              nband: number
              rast: unknown
            }
          | {
              agg: Database["public"]["CompositeTypes"]["agg_count"]
              exclude_nodata_value: boolean
              nband: number
              rast: unknown
              sample_percent: number
            }
          | {
              agg: Database["public"]["CompositeTypes"]["agg_count"]
              exclude_nodata_value: boolean
              rast: unknown
            }
        Returns: Database["public"]["CompositeTypes"]["agg_count"]
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dfullywithin: {
        Args: {
          distance: number
          nband1: number
          nband2: number
          rast1: unknown
          rast2: unknown
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args:
          | {
              distance: number
              nband1: number
              nband2: number
              rast1: unknown
              rast2: unknown
            }
          | {
              geog1: unknown
              geog2: unknown
              tolerance: number
              use_spheroid?: boolean
            }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_gdalwarp: {
        Args: {
          algorithm?: string
          gridx?: number
          gridy?: number
          height?: number
          maxerr?: number
          rast: unknown
          scalex?: number
          scaley?: number
          skewx?: number
          skewy?: number
          srid?: number
          width?: number
        }
        Returns: unknown
      }
      _st_grayscale4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_hillshade4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_histogram: {
        Args: {
          bins?: number
          exclude_nodata_value?: boolean
          max?: number
          min?: number
          nband?: number
          rast: unknown
          right?: boolean
          sample_percent?: number
          width?: number[]
        }
        Returns: Record<string, unknown>[]
      }
      _st_intersects: {
        Args:
          | { geom: unknown; nband?: number; rast: unknown }
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_mapalgebra: {
        Args:
          | {
              callbackfunc: unknown
              customextent?: unknown
              distancex?: number
              distancey?: number
              extenttype?: string
              mask?: number[]
              pixeltype?: string
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
              userargs?: string[]
              weighted?: boolean
            }
          | {
              expression: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
              pixeltype?: string
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
            }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_neighborhood: {
        Args: {
          band: number
          columnx: number
          distancex: number
          distancey: number
          exclude_nodata_value?: boolean
          rast: unknown
          rowy: number
        }
        Returns: number[]
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_pixelascentroids: {
        Args: {
          band?: number
          columnx?: number
          exclude_nodata_value?: boolean
          rast: unknown
          rowy?: number
        }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      _st_pixelaspolygons: {
        Args: {
          band?: number
          columnx?: number
          exclude_nodata_value?: boolean
          rast: unknown
          rowy?: number
        }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_quantile: {
        Args: {
          exclude_nodata_value?: boolean
          nband?: number
          quantiles?: number[]
          rast: unknown
          sample_percent?: number
        }
        Returns: Record<string, unknown>[]
      }
      _st_rastertoworldcoord: {
        Args: { columnx?: number; rast: unknown; rowy?: number }
        Returns: Record<string, unknown>
      }
      _st_reclass: {
        Args: {
          rast: unknown
          reclassargset: Database["public"]["CompositeTypes"]["reclassarg"][]
        }
        Returns: unknown
      }
      _st_roughness4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_samealignment_finalfn: {
        Args: { agg: Database["public"]["CompositeTypes"]["agg_samealignment"] }
        Returns: boolean
      }
      _st_samealignment_transfn: {
        Args: {
          agg: Database["public"]["CompositeTypes"]["agg_samealignment"]
          rast: unknown
        }
        Returns: Database["public"]["CompositeTypes"]["agg_samealignment"]
      }
      _st_setvalues: {
        Args: {
          hasnosetvalue?: boolean
          keepnodata?: boolean
          nband: number
          newvalueset: number[]
          noset?: boolean[]
          nosetvalue?: number
          rast: unknown
          x: number
          y: number
        }
        Returns: unknown
      }
      _st_slope4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_summarystats: {
        Args: {
          exclude_nodata_value?: boolean
          nband?: number
          rast: unknown
          sample_percent?: number
        }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      _st_summarystats_finalfn: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      _st_tile: {
        Args: {
          height: number
          nband?: number[]
          nodataval?: number
          padwithnodata?: boolean
          rast: unknown
          width: number
        }
        Returns: unknown[]
      }
      _st_touches: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_tpi4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_tri4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      _st_union_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_valuecount: {
        Args:
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              roundto?: number
              searchvalues?: number[]
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues?: number[]
            }
        Returns: Record<string, unknown>[]
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      _st_worldtorastercoord: {
        Args: { latitude?: number; longitude?: number; rast: unknown }
        Returns: Record<string, unknown>
      }
      _updaterastersrid: {
        Args: {
          column_name: unknown
          new_srid: number
          schema_name: unknown
          table_name: unknown
        }
        Returns: boolean
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
          | {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
          | {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
        Returns: string
      }
      addoverviewconstraints: {
        Args:
          | {
              ovcolumn: unknown
              ovfactor: number
              ovschema: unknown
              ovtable: unknown
              refcolumn: unknown
              refschema: unknown
              reftable: unknown
            }
          | {
              ovcolumn: unknown
              ovfactor: number
              ovtable: unknown
              refcolumn: unknown
              reftable: unknown
            }
        Returns: boolean
      }
      addrasterconstraints: {
        Args:
          | {
              blocksize_x?: boolean
              blocksize_y?: boolean
              extent?: boolean
              nodata_values?: boolean
              num_bands?: boolean
              out_db?: boolean
              pixel_types?: boolean
              rastcolumn: unknown
              rastschema: unknown
              rasttable: unknown
              regular_blocking?: boolean
              same_alignment?: boolean
              scale_x?: boolean
              scale_y?: boolean
              srid?: boolean
            }
          | {
              blocksize_x?: boolean
              blocksize_y?: boolean
              extent?: boolean
              nodata_values?: boolean
              num_bands?: boolean
              out_db?: boolean
              pixel_types?: boolean
              rastcolumn: unknown
              rasttable: unknown
              regular_blocking?: boolean
              same_alignment?: boolean
              scale_x?: boolean
              scale_y?: boolean
              srid?: boolean
            }
          | {
              constraints: string[]
              rastcolumn: unknown
              rastschema: unknown
              rasttable: unknown
            }
          | { constraints: string[]; rastcolumn: unknown; rasttable: unknown }
        Returns: boolean
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown } | { "": unknown }
        Returns: string
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
          | { column_name: string; schema_name: string; table_name: string }
          | { column_name: string; table_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      dropoverviewconstraints: {
        Args:
          | { ovcolumn: unknown; ovschema: unknown; ovtable: unknown }
          | { ovcolumn: unknown; ovtable: unknown }
        Returns: boolean
      }
      droprasterconstraints: {
        Args:
          | {
              blocksize_x?: boolean
              blocksize_y?: boolean
              extent?: boolean
              nodata_values?: boolean
              num_bands?: boolean
              out_db?: boolean
              pixel_types?: boolean
              rastcolumn: unknown
              rastschema: unknown
              rasttable: unknown
              regular_blocking?: boolean
              same_alignment?: boolean
              scale_x?: boolean
              scale_y?: boolean
              srid?: boolean
            }
          | {
              blocksize_x?: boolean
              blocksize_y?: boolean
              extent?: boolean
              nodata_values?: boolean
              num_bands?: boolean
              out_db?: boolean
              pixel_types?: boolean
              rastcolumn: unknown
              rasttable: unknown
              regular_blocking?: boolean
              same_alignment?: boolean
              scale_x?: boolean
              scale_y?: boolean
              srid?: boolean
            }
          | {
              constraints: string[]
              rastcolumn: unknown
              rastschema: unknown
              rasttable: unknown
            }
          | { constraints: string[]; rastcolumn: unknown; rasttable: unknown }
        Returns: boolean
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_active_subscription: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      owns_business_profile: {
        Args: { profile_id: string }
        Returns: boolean
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: string
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_gdal_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_raster_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_raster_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_raster_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      raster_hash: {
        Args: { "": unknown }
        Returns: number
      }
      raster_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      raster_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addband: {
        Args:
          | {
              addbandargset: Database["public"]["CompositeTypes"]["addbandarg"][]
              rast: unknown
            }
          | {
              fromband?: number
              fromrast: unknown
              torast: unknown
              torastindex?: number
            }
          | {
              fromband?: number
              fromrasts: unknown[]
              torast: unknown
              torastindex?: number
            }
          | {
              index: number
              initialvalue?: number
              nodataval?: number
              pixeltype: string
              rast: unknown
            }
          | {
              index: number
              nodataval?: number
              outdbfile: string
              outdbindex: number[]
              rast: unknown
            }
          | {
              index?: number
              nodataval?: number
              outdbfile: string
              outdbindex: number[]
              rast: unknown
            }
          | {
              initialvalue?: number
              nodataval?: number
              pixeltype: string
              rast: unknown
            }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_approxcount: {
        Args:
          | {
              exclude_nodata_value: boolean
              rast: unknown
              sample_percent?: number
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              sample_percent?: number
            }
          | { nband: number; rast: unknown; sample_percent: number }
          | { rast: unknown; sample_percent: number }
        Returns: number
      }
      st_approxhistogram: {
        Args:
          | {
              bins: number
              exclude_nodata_value: boolean
              nband: number
              rast: unknown
              right: boolean
              sample_percent: number
            }
          | {
              bins: number
              nband: number
              rast: unknown
              right: boolean
              sample_percent: number
            }
          | {
              bins: number
              nband: number
              rast: unknown
              right?: boolean
              sample_percent: number
              width?: number[]
            }
          | {
              bins?: number
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              right?: boolean
              sample_percent?: number
              width?: number[]
            }
          | { nband: number; rast: unknown; sample_percent: number }
          | { rast: unknown; sample_percent: number }
        Returns: Record<string, unknown>[]
      }
      st_approxquantile: {
        Args:
          | {
              exclude_nodata_value: boolean
              nband: number
              quantile: number
              rast: unknown
              sample_percent: number
            }
          | { exclude_nodata_value: boolean; quantile?: number; rast: unknown }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              quantiles?: number[]
              rast: unknown
              sample_percent?: number
            }
          | {
              nband: number
              quantile: number
              rast: unknown
              sample_percent: number
            }
          | {
              nband: number
              quantiles?: number[]
              rast: unknown
              sample_percent: number
            }
          | { quantile: number; rast: unknown }
          | { quantile: number; rast: unknown; sample_percent: number }
          | { quantiles: number[]; rast: unknown }
          | { quantiles?: number[]; rast: unknown; sample_percent: number }
        Returns: Record<string, unknown>[]
      }
      st_approxsummarystats: {
        Args:
          | {
              exclude_nodata_value: boolean
              rast: unknown
              sample_percent?: number
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              sample_percent?: number
            }
          | { nband: number; rast: unknown; sample_percent: number }
          | { rast: unknown; sample_percent: number }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgdalraster: {
        Args: {
          format: string
          options?: string[]
          rast: unknown
          srid?: number
        }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
          | {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
          | {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asjpeg: {
        Args:
          | { nband: number; options?: string[]; rast: unknown }
          | { nband: number; quality: number; rast: unknown }
          | { nbands: number[]; options?: string[]; rast: unknown }
          | { nbands: number[]; quality: number; rast: unknown }
          | { options?: string[]; rast: unknown }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { format?: string; geom: unknown }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_aspect: {
        Args:
          | {
              customextent: unknown
              interpolate_nodata?: boolean
              nband: number
              pixeltype?: string
              rast: unknown
              units?: string
            }
          | {
              interpolate_nodata?: boolean
              nband?: number
              pixeltype?: string
              rast: unknown
              units?: string
            }
        Returns: unknown
      }
      st_aspng: {
        Args:
          | { compression: number; nband: number; rast: unknown }
          | { compression: number; nbands: number[]; rast: unknown }
          | { nband: number; options?: string[]; rast: unknown }
          | { nbands: number[]; options?: string[]; rast: unknown }
          | { options?: string[]; rast: unknown }
        Returns: string
      }
      st_asraster: {
        Args:
          | {
              geom: unknown
              gridx: number
              gridy: number
              height: number
              nodataval?: number
              pixeltype: string
              skewx?: number
              skewy?: number
              touched?: boolean
              value?: number
              width: number
            }
          | {
              geom: unknown
              gridx: number
              gridy: number
              nodataval?: number
              pixeltype: string
              scalex: number
              scaley: number
              skewx?: number
              skewy?: number
              touched?: boolean
              value?: number
            }
          | {
              geom: unknown
              gridx?: number
              gridy?: number
              height: number
              nodataval?: number[]
              pixeltype?: string[]
              skewx?: number
              skewy?: number
              touched?: boolean
              value?: number[]
              width: number
            }
          | {
              geom: unknown
              gridx?: number
              gridy?: number
              nodataval?: number[]
              pixeltype?: string[]
              scalex: number
              scaley: number
              skewx?: number
              skewy?: number
              touched?: boolean
              value?: number[]
            }
          | {
              geom: unknown
              height: number
              nodataval?: number[]
              pixeltype: string[]
              skewx?: number
              skewy?: number
              touched?: boolean
              upperleftx?: number
              upperlefty?: number
              value?: number[]
              width: number
            }
          | {
              geom: unknown
              height: number
              nodataval?: number
              pixeltype: string
              skewx?: number
              skewy?: number
              touched?: boolean
              upperleftx?: number
              upperlefty?: number
              value?: number
              width: number
            }
          | {
              geom: unknown
              nodataval?: number[]
              pixeltype: string[]
              scalex: number
              scaley: number
              skewx?: number
              skewy?: number
              touched?: boolean
              upperleftx?: number
              upperlefty?: number
              value?: number[]
            }
          | {
              geom: unknown
              nodataval?: number[]
              pixeltype?: string[]
              ref: unknown
              touched?: boolean
              value?: number[]
            }
          | {
              geom: unknown
              nodataval?: number
              pixeltype: string
              ref: unknown
              touched?: boolean
              value?: number
            }
          | {
              geom: unknown
              nodataval?: number
              pixeltype: string
              scalex: number
              scaley: number
              skewx?: number
              skewy?: number
              touched?: boolean
              upperleftx?: number
              upperlefty?: number
              value?: number
            }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; rel?: number }
          | { geom: unknown; maxdecimaldigits?: number; rel?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astiff: {
        Args:
          | {
              compression: string
              nbands: number[]
              rast: unknown
              srid?: number
            }
          | { compression: string; rast: unknown; srid?: number }
          | {
              nbands: number[]
              options?: string[]
              rast: unknown
              srid?: number
            }
          | { options?: string[]; rast: unknown; srid?: number }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_band: {
        Args:
          | { delimiter?: string; nbands: string; rast: unknown }
          | { nband: number; rast: unknown }
          | { nbands?: number[]; rast: unknown }
        Returns: unknown
      }
      st_bandfilesize: {
        Args: { band?: number; rast: unknown }
        Returns: number
      }
      st_bandfiletimestamp: {
        Args: { band?: number; rast: unknown }
        Returns: number
      }
      st_bandisnodata: {
        Args:
          | { band?: number; forcechecking?: boolean; rast: unknown }
          | { forcechecking: boolean; rast: unknown }
        Returns: boolean
      }
      st_bandmetadata: {
        Args:
          | { band: number[]; rast: unknown }
          | { band?: number; rast: unknown }
        Returns: {
          bandnum: number
          filesize: number
          filetimestamp: number
          isoutdb: boolean
          nodatavalue: number
          outdbbandnum: number
          path: string
          pixeltype: string
        }[]
      }
      st_bandnodatavalue: {
        Args: { band?: number; rast: unknown }
        Returns: number
      }
      st_bandpath: {
        Args: { band?: number; rast: unknown }
        Returns: string
      }
      st_bandpixeltype: {
        Args: { band?: number; rast: unknown }
        Returns: string
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; options?: string; radius: number }
          | { geom: unknown; quadsegs: number; radius: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clip: {
        Args:
          | { crop: boolean; geom: unknown; nband: number; rast: unknown }
          | { crop: boolean; geom: unknown; rast: unknown }
          | {
              crop?: boolean
              geom: unknown
              nband: number[]
              nodataval?: number[]
              rast: unknown
            }
          | {
              crop?: boolean
              geom: unknown
              nband: number
              nodataval: number
              rast: unknown
            }
          | { crop?: boolean; geom: unknown; nodataval: number; rast: unknown }
          | {
              crop?: boolean
              geom: unknown
              nodataval?: number[]
              rast: unknown
            }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_colormap: {
        Args:
          | { colormap: string; method?: string; rast: unknown }
          | {
              colormap?: string
              method?: string
              nband?: number
              rast: unknown
            }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_contour: {
        Args: {
          bandnumber?: number
          fixed_levels?: number[]
          level_base?: number
          level_interval?: number
          polygonize?: boolean
          rast: unknown
        }
        Returns: {
          geom: unknown
          id: number
          value: number
        }[]
      }
      st_convexhull: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_count: {
        Args:
          | { exclude_nodata_value: boolean; rast: unknown }
          | { exclude_nodata_value?: boolean; nband?: number; rast: unknown }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_createoverview: {
        Args: { algo?: string; col: unknown; factor: number; tab: unknown }
        Returns: unknown
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_dfullywithin: {
        Args:
          | {
              distance: number
              nband1: number
              nband2: number
              rast1: unknown
              rast2: unknown
            }
          | { distance: number; rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distinct4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpaspolygons: {
        Args: { band?: number; exclude_nodata_value?: boolean; rast: unknown }
        Returns: Database["public"]["CompositeTypes"]["geomval"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpvalues: {
        Args:
          | { exclude_nodata_value?: boolean; nband: number; rast: unknown }
          | { exclude_nodata_value?: boolean; nband?: number[]; rast: unknown }
        Returns: {
          nband: number
          valarray: number[]
        }[]
      }
      st_dwithin: {
        Args:
          | {
              distance: number
              nband1: number
              nband2: number
              rast1: unknown
              rast2: unknown
            }
          | { distance: number; rast1: unknown; rast2: unknown }
          | {
              geog1: unknown
              geog2: unknown
              tolerance: number
              use_spheroid?: boolean
            }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { dm?: number; dx: number; dy: number; dz?: number; geom: unknown }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_fromgdalraster: {
        Args: { gdaldata: string; srid?: number }
        Returns: unknown
      }
      st_gdaldrivers: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_georeference: {
        Args: { format?: string; rast: unknown }
        Returns: string
      }
      st_geotransform: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_grayscale: {
        Args:
          | {
              blueband?: number
              extenttype?: string
              greenband?: number
              rast: unknown
              redband?: number
            }
          | {
              extenttype?: string
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
            }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hasnoband: {
        Args: { nband?: number; rast: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_height: {
        Args: { "": unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_hillshade: {
        Args:
          | {
              altitude?: number
              azimuth?: number
              customextent: unknown
              interpolate_nodata?: boolean
              max_bright?: number
              nband: number
              pixeltype?: string
              rast: unknown
              scale?: number
            }
          | {
              altitude?: number
              azimuth?: number
              interpolate_nodata?: boolean
              max_bright?: number
              nband?: number
              pixeltype?: string
              rast: unknown
              scale?: number
            }
        Returns: unknown
      }
      st_histogram: {
        Args:
          | {
              bins: number
              exclude_nodata_value: boolean
              nband: number
              rast: unknown
              right: boolean
            }
          | { bins: number; nband: number; rast: unknown; right: boolean }
          | {
              bins: number
              nband: number
              rast: unknown
              right?: boolean
              width?: number[]
            }
          | {
              bins?: number
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              right?: boolean
              width?: number[]
            }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_interpolateraster: {
        Args: {
          bandnumber?: number
          geom: unknown
          options: string
          rast: unknown
        }
        Returns: unknown
      }
      st_intersection: {
        Args:
          | { band: number; geomin: unknown; rast: unknown }
          | { band?: number; geomin: unknown; rast: unknown }
          | {
              band1: number
              band2: number
              nodataval: number[]
              rast1: unknown
              rast2: unknown
            }
          | {
              band1: number
              band2: number
              nodataval: number
              rast1: unknown
              rast2: unknown
            }
          | {
              band1: number
              band2: number
              nodataval: number
              rast1: unknown
              rast2: unknown
              returnband: string
            }
          | {
              band1: number
              band2: number
              nodataval?: number[]
              rast1: unknown
              rast2: unknown
              returnband?: string
            }
          | { geom1: unknown; geom2: unknown; gridsize?: number }
          | { geomin: unknown; rast: unknown }
          | { nodataval: number[]; rast1: unknown; rast2: unknown }
          | { nodataval: number; rast1: unknown; rast2: unknown }
          | {
              nodataval: number
              rast1: unknown
              rast2: unknown
              returnband: string
            }
          | {
              nodataval?: number[]
              rast1: unknown
              rast2: unknown
              returnband?: string
            }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom: unknown; nband: number; rast: unknown }
          | { geom: unknown; nband?: number; rast: unknown }
          | { geom: unknown; nband?: number; rast: unknown }
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_invdistweight4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscoveragetile: {
        Args: {
          coverage: unknown
          rast: unknown
          tileheight: number
          tilewidth: number
        }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown } | { rast: unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { font?: Json; letters: string }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeemptycoverage: {
        Args: {
          height: number
          scalex: number
          scaley: number
          skewx: number
          skewy: number
          srid?: number
          tileheight: number
          tilewidth: number
          upperleftx: number
          upperlefty: number
          width: number
        }
        Returns: unknown[]
      }
      st_makeemptyraster: {
        Args:
          | {
              height: number
              pixelsize: number
              upperleftx: number
              upperlefty: number
              width: number
            }
          | {
              height: number
              scalex: number
              scaley: number
              skewx: number
              skewy: number
              srid?: number
              upperleftx: number
              upperlefty: number
              width: number
            }
          | { rast: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_mapalgebra: {
        Args:
          | {
              band1: number
              band2: number
              expression: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
              pixeltype?: string
              rast1: unknown
              rast2: unknown
            }
          | {
              callbackfunc: unknown
              customextent?: unknown
              distancex?: number
              distancey?: number
              extenttype?: string
              nband: number[]
              pixeltype?: string
              rast: unknown
              userargs?: string[]
            }
          | {
              callbackfunc: unknown
              customextent?: unknown
              distancex?: number
              distancey?: number
              extenttype?: string
              nband: number
              pixeltype?: string
              rast: unknown
              userargs?: string[]
            }
          | {
              callbackfunc: unknown
              customextent?: unknown
              distancex?: number
              distancey?: number
              extenttype?: string
              nband1: number
              nband2: number
              pixeltype?: string
              rast1: unknown
              rast2: unknown
              userargs?: string[]
            }
          | {
              callbackfunc: unknown
              customextent?: unknown
              distancex?: number
              distancey?: number
              extenttype?: string
              pixeltype?: string
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
              userargs?: string[]
            }
          | {
              callbackfunc: unknown
              customextent?: unknown
              extenttype?: string
              mask: number[]
              nband: number
              pixeltype?: string
              rast: unknown
              userargs?: string[]
              weighted: boolean
            }
          | {
              expression: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
              pixeltype?: string
              rast1: unknown
              rast2: unknown
            }
          | {
              expression: string
              nband: number
              nodataval?: number
              pixeltype: string
              rast: unknown
            }
          | {
              expression: string
              nodataval?: number
              pixeltype: string
              rast: unknown
            }
        Returns: unknown
      }
      st_mapalgebraexpr: {
        Args:
          | {
              band: number
              expression: string
              nodataval?: number
              pixeltype: string
              rast: unknown
            }
          | {
              band1: number
              band2: number
              expression: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
              pixeltype?: string
              rast1: unknown
              rast2: unknown
            }
          | {
              expression: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
              pixeltype?: string
              rast1: unknown
              rast2: unknown
            }
          | {
              expression: string
              nodataval?: number
              pixeltype: string
              rast: unknown
            }
        Returns: unknown
      }
      st_mapalgebrafct: {
        Args:
          | {
              args: string[]
              band: number
              onerastuserfunc: unknown
              pixeltype: string
              rast: unknown
            }
          | {
              args: string[]
              band: number
              onerastuserfunc: unknown
              rast: unknown
            }
          | {
              args: string[]
              onerastuserfunc: unknown
              pixeltype: string
              rast: unknown
            }
          | { args: string[]; onerastuserfunc: unknown; rast: unknown }
          | {
              band: number
              onerastuserfunc: unknown
              pixeltype: string
              rast: unknown
            }
          | { band: number; onerastuserfunc: unknown; rast: unknown }
          | {
              band1: number
              band2: number
              extenttype?: string
              pixeltype?: string
              rast1: unknown
              rast2: unknown
              tworastuserfunc: unknown
              userargs?: string[]
            }
          | {
              extenttype?: string
              pixeltype?: string
              rast1: unknown
              rast2: unknown
              tworastuserfunc: unknown
              userargs?: string[]
            }
          | { onerastuserfunc: unknown; pixeltype: string; rast: unknown }
          | { onerastuserfunc: unknown; rast: unknown }
        Returns: unknown
      }
      st_mapalgebrafctngb: {
        Args: {
          args: string[]
          band: number
          ngbheight: number
          ngbwidth: number
          nodatamode: string
          onerastngbuserfunc: unknown
          pixeltype: string
          rast: unknown
        }
        Returns: unknown
      }
      st_max4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_mean4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_memsize: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      st_metadata: {
        Args: { rast: unknown }
        Returns: Record<string, unknown>
      }
      st_min4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_minconvexhull: {
        Args: { nband?: number; rast: unknown }
        Returns: unknown
      }
      st_mindist4ma: {
        Args: { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_minpossiblevalue: {
        Args: { pixeltype: string }
        Returns: number
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_nearestvalue: {
        Args:
          | {
              band: number
              columnx: number
              exclude_nodata_value?: boolean
              rast: unknown
              rowy: number
            }
          | {
              band: number
              exclude_nodata_value?: boolean
              pt: unknown
              rast: unknown
            }
          | {
              columnx: number
              exclude_nodata_value?: boolean
              rast: unknown
              rowy: number
            }
          | { exclude_nodata_value?: boolean; pt: unknown; rast: unknown }
        Returns: number
      }
      st_neighborhood: {
        Args:
          | {
              band: number
              columnx: number
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
              rast: unknown
              rowy: number
            }
          | {
              band: number
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
              pt: unknown
              rast: unknown
            }
          | {
              columnx: number
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
              rast: unknown
              rowy: number
            }
          | {
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
              pt: unknown
              rast: unknown
            }
        Returns: number[]
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_notsamealignmentreason: {
        Args: { rast1: unknown; rast2: unknown }
        Returns: string
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numbands: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pixelascentroid: {
        Args: { rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_pixelascentroids: {
        Args: { band?: number; exclude_nodata_value?: boolean; rast: unknown }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelaspoint: {
        Args: { rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_pixelaspoints: {
        Args: { band?: number; exclude_nodata_value?: boolean; rast: unknown }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelaspolygon: {
        Args: { rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_pixelaspolygons: {
        Args: { band?: number; exclude_nodata_value?: boolean; rast: unknown }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelheight: {
        Args: { "": unknown }
        Returns: number
      }
      st_pixelofvalue: {
        Args:
          | {
              exclude_nodata_value?: boolean
              nband: number
              rast: unknown
              search: number[]
            }
          | {
              exclude_nodata_value?: boolean
              nband: number
              rast: unknown
              search: number
            }
          | { exclude_nodata_value?: boolean; rast: unknown; search: number[] }
          | { exclude_nodata_value?: boolean; rast: unknown; search: number }
        Returns: {
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelwidth: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygon: {
        Args: { band?: number; rast: unknown }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantile: {
        Args:
          | {
              exclude_nodata_value: boolean
              nband: number
              quantile: number
              rast: unknown
            }
          | { exclude_nodata_value: boolean; quantile?: number; rast: unknown }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              quantiles?: number[]
              rast: unknown
            }
          | { nband: number; quantile: number; rast: unknown }
          | { nband: number; quantiles: number[]; rast: unknown }
          | { quantile: number; rast: unknown }
          | { quantiles: number[]; rast: unknown }
        Returns: Record<string, unknown>[]
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_range4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_rastertoworldcoord: {
        Args: { columnx: number; rast: unknown; rowy: number }
        Returns: Record<string, unknown>
      }
      st_rastertoworldcoordx: {
        Args:
          | { rast: unknown; xr: number }
          | { rast: unknown; xr: number; yr: number }
        Returns: number
      }
      st_rastertoworldcoordy: {
        Args:
          | { rast: unknown; xr: number; yr: number }
          | { rast: unknown; yr: number }
        Returns: number
      }
      st_rastfromhexwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_rastfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_reclass: {
        Args:
          | {
              nband: number
              nodataval?: number
              pixeltype: string
              rast: unknown
              reclassexpr: string
            }
          | { pixeltype: string; rast: unknown; reclassexpr: string }
          | {
              rast: unknown
              reclassargset: Database["public"]["CompositeTypes"]["reclassarg"][]
            }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_resample: {
        Args:
          | {
              algorithm?: string
              gridx?: number
              gridy?: number
              height: number
              maxerr?: number
              rast: unknown
              skewx?: number
              skewy?: number
              width: number
            }
          | {
              algorithm?: string
              gridx?: number
              gridy?: number
              maxerr?: number
              rast: unknown
              scalex?: number
              scaley?: number
              skewx?: number
              skewy?: number
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              ref: unknown
              usescale: boolean
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              ref: unknown
              usescale?: boolean
            }
        Returns: unknown
      }
      st_rescale: {
        Args:
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              scalex: number
              scaley: number
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              scalexy: number
            }
        Returns: unknown
      }
      st_resize: {
        Args:
          | {
              algorithm?: string
              height: number
              maxerr?: number
              rast: unknown
              width: number
            }
          | {
              algorithm?: string
              height: string
              maxerr?: number
              rast: unknown
              width: string
            }
          | {
              algorithm?: string
              maxerr?: number
              percentheight: number
              percentwidth: number
              rast: unknown
            }
        Returns: unknown
      }
      st_reskew: {
        Args:
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              skewx: number
              skewy: number
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              skewxy: number
            }
        Returns: unknown
      }
      st_retile: {
        Args: {
          algo?: string
          col: unknown
          ext: unknown
          sfx: number
          sfy: number
          tab: unknown
          th: number
          tw: number
        }
        Returns: unknown[]
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_rotation: {
        Args: { "": unknown }
        Returns: number
      }
      st_roughness: {
        Args:
          | {
              customextent: unknown
              interpolate_nodata?: boolean
              nband: number
              pixeltype?: string
              rast: unknown
            }
          | {
              interpolate_nodata?: boolean
              nband?: number
              pixeltype?: string
              rast: unknown
            }
        Returns: unknown
      }
      st_samealignment: {
        Args:
          | { rast1: unknown; rast2: unknown }
          | {
              scalex1: number
              scalex2: number
              scaley1: number
              scaley2: number
              skewx1: number
              skewx2: number
              skewy1: number
              skewy2: number
              ulx1: number
              ulx2: number
              uly1: number
              uly2: number
            }
        Returns: boolean
      }
      st_scalex: {
        Args: { "": unknown }
        Returns: number
      }
      st_scaley: {
        Args: { "": unknown }
        Returns: number
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setbandindex: {
        Args: {
          band: number
          force?: boolean
          outdbindex: number
          rast: unknown
        }
        Returns: unknown
      }
      st_setbandisnodata: {
        Args: { band?: number; rast: unknown }
        Returns: unknown
      }
      st_setbandnodatavalue: {
        Args:
          | {
              band: number
              forcechecking?: boolean
              nodatavalue: number
              rast: unknown
            }
          | { nodatavalue: number; rast: unknown }
        Returns: unknown
      }
      st_setbandpath: {
        Args: {
          band: number
          force?: boolean
          outdbindex: number
          outdbpath: string
          rast: unknown
        }
        Returns: unknown
      }
      st_setgeoreference: {
        Args:
          | { format?: string; georef: string; rast: unknown }
          | {
              rast: unknown
              scalex: number
              scaley: number
              skewx: number
              skewy: number
              upperleftx: number
              upperlefty: number
            }
        Returns: unknown
      }
      st_setgeotransform: {
        Args: {
          imag: number
          jmag: number
          rast: unknown
          theta_i: number
          theta_ij: number
          xoffset: number
          yoffset: number
        }
        Returns: unknown
      }
      st_setm: {
        Args: { band?: number; geom: unknown; rast: unknown; resample?: string }
        Returns: unknown
      }
      st_setrotation: {
        Args: { rast: unknown; rotation: number }
        Returns: unknown
      }
      st_setscale: {
        Args:
          | { rast: unknown; scale: number }
          | { rast: unknown; scalex: number; scaley: number }
        Returns: unknown
      }
      st_setskew: {
        Args:
          | { rast: unknown; skew: number }
          | { rast: unknown; skewx: number; skewy: number }
        Returns: unknown
      }
      st_setsrid: {
        Args:
          | { geog: unknown; srid: number }
          | { geom: unknown; srid: number }
          | { rast: unknown; srid: number }
        Returns: unknown
      }
      st_setupperleft: {
        Args: { rast: unknown; upperleftx: number; upperlefty: number }
        Returns: unknown
      }
      st_setvalue: {
        Args:
          | {
              band: number
              newvalue: number
              rast: unknown
              x: number
              y: number
            }
          | { geom: unknown; nband: number; newvalue: number; rast: unknown }
          | { geom: unknown; newvalue: number; rast: unknown }
          | { newvalue: number; rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_setvalues: {
        Args:
          | {
              geomvalset: Database["public"]["CompositeTypes"]["geomval"][]
              keepnodata?: boolean
              nband: number
              rast: unknown
            }
          | {
              height: number
              keepnodata?: boolean
              nband: number
              newvalue: number
              rast: unknown
              width: number
              x: number
              y: number
            }
          | {
              height: number
              keepnodata?: boolean
              newvalue: number
              rast: unknown
              width: number
              x: number
              y: number
            }
          | {
              keepnodata?: boolean
              nband: number
              newvalueset: number[]
              noset?: boolean[]
              rast: unknown
              x: number
              y: number
            }
          | {
              keepnodata?: boolean
              nband: number
              newvalueset: number[]
              nosetvalue: number
              rast: unknown
              x: number
              y: number
            }
        Returns: unknown
      }
      st_setz: {
        Args: { band?: number; geom: unknown; rast: unknown; resample?: string }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_skewx: {
        Args: { "": unknown }
        Returns: number
      }
      st_skewy: {
        Args: { "": unknown }
        Returns: number
      }
      st_slope: {
        Args:
          | {
              customextent: unknown
              interpolate_nodata?: boolean
              nband: number
              pixeltype?: string
              rast: unknown
              scale?: number
              units?: string
            }
          | {
              interpolate_nodata?: boolean
              nband?: number
              pixeltype?: string
              rast: unknown
              scale?: number
              units?: string
            }
        Returns: unknown
      }
      st_snaptogrid: {
        Args:
          | {
              algorithm?: string
              gridx: number
              gridy: number
              maxerr?: number
              rast: unknown
              scalex: number
              scaley: number
            }
          | {
              algorithm?: string
              gridx: number
              gridy: number
              maxerr?: number
              rast: unknown
              scalex?: number
              scaley?: number
            }
          | {
              algorithm?: string
              gridx: number
              gridy: number
              maxerr?: number
              rast: unknown
              scalexy: number
            }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { "": unknown } | { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_stddev4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_sum4ma: {
        Args:
          | { args: string[]; matrix: number[]; nodatamode: string }
          | { pos: number[]; userargs?: string[]; value: number[] }
        Returns: number
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown } | { rast: unknown }
        Returns: string
      }
      st_summarystats: {
        Args:
          | { exclude_nodata_value: boolean; rast: unknown }
          | { exclude_nodata_value?: boolean; nband?: number; rast: unknown }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tile: {
        Args:
          | {
              height: number
              nband: number[]
              nodataval?: number
              padwithnodata?: boolean
              rast: unknown
              width: number
            }
          | {
              height: number
              nband: number
              nodataval?: number
              padwithnodata?: boolean
              rast: unknown
              width: number
            }
          | {
              height: number
              nodataval?: number
              padwithnodata?: boolean
              rast: unknown
              width: number
            }
        Returns: unknown[]
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_tpi: {
        Args:
          | {
              customextent: unknown
              interpolate_nodata?: boolean
              nband: number
              pixeltype?: string
              rast: unknown
            }
          | {
              interpolate_nodata?: boolean
              nband?: number
              pixeltype?: string
              rast: unknown
            }
        Returns: unknown
      }
      st_transform: {
        Args:
          | {
              algorithm?: string
              alignto: unknown
              maxerr?: number
              rast: unknown
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              scalex: number
              scaley: number
              srid: number
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              scalex?: number
              scaley?: number
              srid: number
            }
          | {
              algorithm?: string
              maxerr?: number
              rast: unknown
              scalexy: number
              srid: number
            }
          | { from_proj: string; geom: unknown; to_proj: string }
          | { from_proj: string; geom: unknown; to_srid: number }
          | { geom: unknown; to_proj: string }
        Returns: unknown
      }
      st_tri: {
        Args:
          | {
              customextent: unknown
              interpolate_nodata?: boolean
              nband: number
              pixeltype?: string
              rast: unknown
            }
          | {
              interpolate_nodata?: boolean
              nband?: number
              pixeltype?: string
              rast: unknown
            }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_upperleftx: {
        Args: { "": unknown }
        Returns: number
      }
      st_upperlefty: {
        Args: { "": unknown }
        Returns: number
      }
      st_value: {
        Args:
          | {
              band: number
              exclude_nodata_value?: boolean
              pt: unknown
              rast: unknown
              resample?: string
            }
          | {
              band: number
              exclude_nodata_value?: boolean
              rast: unknown
              x: number
              y: number
            }
          | { exclude_nodata_value?: boolean; pt: unknown; rast: unknown }
          | {
              exclude_nodata_value?: boolean
              rast: unknown
              x: number
              y: number
            }
        Returns: number
      }
      st_valuecount: {
        Args:
          | {
              exclude_nodata_value: boolean
              nband: number
              rast: unknown
              roundto?: number
              searchvalue: number
            }
          | {
              exclude_nodata_value: boolean
              nband: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalue: number
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              roundto?: number
              searchvalues?: number[]
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues?: number[]
            }
          | {
              nband: number
              rast: unknown
              roundto?: number
              searchvalue: number
            }
          | {
              nband: number
              rast: unknown
              roundto?: number
              searchvalues: number[]
            }
          | {
              nband: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalue: number
            }
          | {
              nband: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues: number[]
            }
          | { rast: unknown; roundto?: number; searchvalue: number }
          | { rast: unknown; roundto?: number; searchvalues: number[] }
          | {
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalue: number
            }
          | {
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues: number[]
            }
        Returns: Record<string, unknown>[]
      }
      st_valuepercent: {
        Args:
          | {
              exclude_nodata_value: boolean
              nband: number
              rast: unknown
              roundto?: number
              searchvalue: number
            }
          | {
              exclude_nodata_value: boolean
              nband: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalue: number
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rast: unknown
              roundto?: number
              searchvalues?: number[]
            }
          | {
              exclude_nodata_value?: boolean
              nband?: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues?: number[]
            }
          | {
              nband: number
              rast: unknown
              roundto?: number
              searchvalue: number
            }
          | {
              nband: number
              rast: unknown
              roundto?: number
              searchvalues: number[]
            }
          | {
              nband: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalue: number
            }
          | {
              nband: number
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues: number[]
            }
          | { rast: unknown; roundto?: number; searchvalue: number }
          | { rast: unknown; roundto?: number; searchvalues: number[] }
          | {
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalue: number
            }
          | {
              rastercolumn: string
              rastertable: string
              roundto?: number
              searchvalues: number[]
            }
        Returns: Record<string, unknown>[]
      }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_width: {
        Args: { "": unknown }
        Returns: number
      }
      st_within: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { nband1: number; nband2: number; rast1: unknown; rast2: unknown }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_worldtorastercoord: {
        Args:
          | { latitude: number; longitude: number; rast: unknown }
          | { pt: unknown; rast: unknown }
        Returns: Record<string, unknown>
      }
      st_worldtorastercoordx: {
        Args:
          | { pt: unknown; rast: unknown }
          | { rast: unknown; xw: number }
          | { rast: unknown; xw: number; yw: number }
        Returns: number
      }
      st_worldtorastercoordy: {
        Args:
          | { pt: unknown; rast: unknown }
          | { rast: unknown; xw: number; yw: number }
          | { rast: unknown; yw: number }
        Returns: number
      }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
      updaterastersrid: {
        Args:
          | {
              column_name: unknown
              new_srid: number
              schema_name: unknown
              table_name: unknown
            }
          | { column_name: unknown; new_srid: number; table_name: unknown }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      addbandarg: {
        index: number | null
        pixeltype: string | null
        initialvalue: number | null
        nodataval: number | null
      }
      agg_count: {
        count: number | null
        nband: number | null
        exclude_nodata_value: boolean | null
        sample_percent: number | null
      }
      agg_samealignment: {
        refraster: unknown | null
        aligned: boolean | null
      }
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      geomval: {
        geom: unknown | null
        val: number | null
      }
      rastbandarg: {
        rast: unknown | null
        nband: number | null
      }
      reclassarg: {
        nband: number | null
        reclassexpr: string | null
        pixeltype: string | null
        nodataval: number | null
      }
      summarystats: {
        count: number | null
        sum: number | null
        mean: number | null
        stddev: number | null
        min: number | null
        max: number | null
      }
      unionarg: {
        nband: number | null
        uniontype: string | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
