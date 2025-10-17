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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_providers: {
        Row: {
          api_base_url: string | null
          api_variant: string
          capabilities: string[]
          created_at: string
          id: string
          is_active: boolean
          label: string
          metadata: Json | null
          model: string
          provider: string
          secret_name: string
          slug: string
          updated_at: string
        }
        Insert: {
          api_base_url?: string | null
          api_variant?: string
          capabilities?: string[]
          created_at?: string
          id?: string
          is_active?: boolean
          label: string
          metadata?: Json | null
          model: string
          provider: string
          secret_name: string
          slug: string
          updated_at?: string
        }
        Update: {
          api_base_url?: string | null
          api_variant?: string
          capabilities?: string[]
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string
          metadata?: Json | null
          model?: string
          provider?: string
          secret_name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_task_assignments: {
        Row: {
          created_at: string
          fallback_provider_id: string | null
          metadata: Json | null
          provider_id: string | null
          task_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          fallback_provider_id?: string | null
          metadata?: Json | null
          provider_id?: string | null
          task_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          fallback_provider_id?: string | null
          metadata?: Json | null
          provider_id?: string | null
          task_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_task_assignments_fallback_provider_id_fkey"
            columns: ["fallback_provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_task_assignments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      api_configurations: {
        Row: {
          api_key_encrypted: string | null
          api_name: string
          created_at: string
          id: string
          is_active: boolean | null
          settings: Json | null
          updated_at: string
        }
        Insert: {
          api_key_encrypted?: string | null
          api_name: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          api_key_encrypted?: string | null
          api_name?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          booking_reference: string | null
          created_at: string
          currency: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          experience_id: string
          id: string
          notes: string | null
          participants: number | null
          payment_status: string | null
          status: string | null
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_date: string
          booking_reference?: string | null
          created_at?: string
          currency?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          experience_id: string
          id?: string
          notes?: string | null
          participants?: number | null
          payment_status?: string | null
          status?: string | null
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          booking_reference?: string | null
          created_at?: string
          currency?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          experience_id?: string
          id?: string
          notes?: string | null
          participants?: number | null
          payment_status?: string | null
          status?: string | null
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      business_addon_purchases: {
        Row: {
          active_from: string | null
          active_to: string | null
          addon_key: string
          business_profile_id: string
          created_at: string
          id: string
          metadata: Json
          scheduled_start_at: string | null
          status: string
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          active_from?: string | null
          active_to?: string | null
          addon_key: string
          business_profile_id: string
          created_at?: string
          id?: string
          metadata?: Json
          scheduled_start_at?: string | null
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          active_from?: string | null
          active_to?: string | null
          addon_key?: string
          business_profile_id?: string
          created_at?: string
          id?: string
          metadata?: Json
          scheduled_start_at?: string | null
          status?: string
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
          addon_type: Database["public"]["Enums"]["business_addon_type"]
          base_price_cents: number | null
          created_at: string
          currency: string
          description: string | null
          duration_days: number | null
          is_active: boolean
          metadata: Json
          name: string
          sort_order: number
          stripe_price_id: string | null
          updated_at: string
        }
        Insert: {
          addon_key: string
          addon_type: Database["public"]["Enums"]["business_addon_type"]
          base_price_cents?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          duration_days?: number | null
          is_active?: boolean
          metadata?: Json
          name: string
          sort_order?: number
          stripe_price_id?: string | null
          updated_at?: string
        }
        Update: {
          addon_key?: string
          addon_type?: Database["public"]["Enums"]["business_addon_type"]
          base_price_cents?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          duration_days?: number | null
          is_active?: boolean
          metadata?: Json
          name?: string
          sort_order?: number
          stripe_price_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      business_claim_documents: {
        Row: {
          claim_id: string
          created_at: string
          created_by: string | null
          document_type: string
          id: string
          metadata: Json
          phash: string | null
          sha1_hash: string | null
          storage_bucket: string
          storage_path: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          created_by?: string | null
          document_type: string
          id?: string
          metadata?: Json
          phash?: string | null
          sha1_hash?: string | null
          storage_bucket?: string
          storage_path: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          created_by?: string | null
          document_type?: string
          id?: string
          metadata?: Json
          phash?: string | null
          sha1_hash?: string | null
          storage_bucket?: string
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
          created_at: string
          id: string
          payment_status: Database["public"]["Enums"]["business_claim_payment_status"]
          place_id: string
          rejected_at: string | null
          status: Database["public"]["Enums"]["business_claim_status"]
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          submitted_at: string | null
          updated_at: string
          verification_notes: string | null
          verification_payload: Json
          verification_status: Database["public"]["Enums"]["business_claim_verification_status"]
        }
        Insert: {
          approved_at?: string | null
          business_profile_id: string
          cancelled_at?: string | null
          created_at?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["business_claim_payment_status"]
          place_id: string
          rejected_at?: string | null
          status?: Database["public"]["Enums"]["business_claim_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          submitted_at?: string | null
          updated_at?: string
          verification_notes?: string | null
          verification_payload?: Json
          verification_status?: Database["public"]["Enums"]["business_claim_verification_status"]
        }
        Update: {
          approved_at?: string | null
          business_profile_id?: string
          cancelled_at?: string | null
          created_at?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["business_claim_payment_status"]
          place_id?: string
          rejected_at?: string | null
          status?: Database["public"]["Enums"]["business_claim_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          submitted_at?: string | null
          updated_at?: string
          verification_notes?: string | null
          verification_payload?: Json
          verification_status?: Database["public"]["Enums"]["business_claim_verification_status"]
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
      business_events: {
        Row: {
          business_profile_id: string
          created_at: string
          description: string | null
          end_at: string | null
          id: string
          is_published: boolean
          metadata: Json
          place_id: string
          start_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          business_profile_id: string
          created_at?: string
          description?: string | null
          end_at?: string | null
          id?: string
          is_published?: boolean
          metadata?: Json
          place_id: string
          start_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          business_profile_id?: string
          created_at?: string
          description?: string | null
          end_at?: string | null
          id?: string
          is_published?: boolean
          metadata?: Json
          place_id?: string
          start_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_events_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_events_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      business_leads: {
        Row: {
          business_profile_id: string
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string | null
          place_id: string
        }
        Insert: {
          business_profile_id: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          place_id: string
        }
        Update: {
          business_profile_id?: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          place_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_leads_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_leads_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      business_pages: {
        Row: {
          business_profile_id: string
          config: Json
          created_at: string
          id: string
          place_id: string
          updated_at: string
        }
        Insert: {
          business_profile_id: string
          config?: Json
          created_at?: string
          id?: string
          place_id: string
          updated_at?: string
        }
        Update: {
          business_profile_id?: string
          config?: Json
          created_at?: string
          id?: string
          place_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_pages_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_pages_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: true
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      business_plan_features: {
        Row: {
          created_at: string
          feature_key: string
          feature_level: string | null
          id: string
          plan_key: string
        }
        Insert: {
          created_at?: string
          feature_key: string
          feature_level?: string | null
          id?: string
          plan_key: string
        }
        Update: {
          created_at?: string
          feature_key?: string
          feature_level?: string | null
          id?: string
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
          created_at: string
          currency: string
          description: string | null
          is_active: boolean
          metadata: Json
          monthly_price_cents: number
          name: string
          plan_key: string
          sort_order: number
          stripe_price_id: string | null
          stripe_price_id_annual: string | null
          stripe_price_id_monthly: string | null
          updated_at: string
        }
        Insert: {
          annual_price_cents?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          is_active?: boolean
          metadata?: Json
          monthly_price_cents: number
          name: string
          plan_key: string
          sort_order?: number
          stripe_price_id?: string | null
          stripe_price_id_annual?: string | null
          stripe_price_id_monthly?: string | null
          updated_at?: string
        }
        Update: {
          annual_price_cents?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          is_active?: boolean
          metadata?: Json
          monthly_price_cents?: number
          name?: string
          plan_key?: string
          sort_order?: number
          stripe_price_id?: string | null
          stripe_price_id_annual?: string | null
          stripe_price_id_monthly?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          company_name: string | null
          contact_name: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          locale: string | null
          metadata: Json
          onboarding_completed_at: string | null
          phone: string | null
          status: Database["public"]["Enums"]["business_profile_status"]
          stripe_customer_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          contact_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          locale?: string | null
          metadata?: Json
          onboarding_completed_at?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["business_profile_status"]
          stripe_customer_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          locale?: string | null
          metadata?: Json
          onboarding_completed_at?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["business_profile_status"]
          stripe_customer_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      business_subscriptions: {
        Row: {
          billing_interval: Database["public"]["Enums"]["business_subscription_interval"]
          business_profile_id: string
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          metadata: Json
          plan_key: string
          price_cents: number | null
          price_currency: string | null
          status: Database["public"]["Enums"]["business_subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          stripe_subscription_item_id: string | null
          updated_at: string
        }
        Insert: {
          billing_interval?: Database["public"]["Enums"]["business_subscription_interval"]
          business_profile_id: string
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          metadata?: Json
          plan_key: string
          price_cents?: number | null
          price_currency?: string | null
          status?: Database["public"]["Enums"]["business_subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_subscription_item_id?: string | null
          updated_at?: string
        }
        Update: {
          billing_interval?: Database["public"]["Enums"]["business_subscription_interval"]
          business_profile_id?: string
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          metadata?: Json
          plan_key?: string
          price_cents?: number | null
          price_currency?: string | null
          status?: Database["public"]["Enums"]["business_subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_subscription_item_id?: string | null
          updated_at?: string
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
          created_at: string
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          name_de: string | null
          name_en: string | null
          name_es: string | null
          parent_id: string | null
          slug: string
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          name_de?: string | null
          name_en?: string | null
          name_es?: string | null
          parent_id?: string | null
          slug: string
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          name_de?: string | null
          name_en?: string | null
          name_es?: string | null
          parent_id?: string | null
          slug?: string
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          sort_order?: number | null
          updated_at?: string
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
      content: {
        Row: {
          content_data: Json | null
          content_type_id: string
          created_at: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          metadata: Json | null
          published_at: string | null
          slug: string
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          sort_order: number | null
          title: string
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          content_data?: Json | null
          content_type_id: string
          created_at?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          metadata?: Json | null
          published_at?: string | null
          slug: string
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          sort_order?: number | null
          title: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          content_data?: Json | null
          content_type_id?: string
          created_at?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          metadata?: Json | null
          published_at?: string | null
          slug?: string
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          sort_order?: number | null
          title?: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_content_type_id_fkey"
            columns: ["content_type_id"]
            isOneToOne: false
            referencedRelation: "content_types"
            referencedColumns: ["id"]
          },
        ]
      }
      content_types: {
        Row: {
          created_at: string | null
          display_name: string
          id: string
          is_active: boolean | null
          name: string
          schema_fields: Json | null
          template_name: string | null
          updated_at: string | null
          url_pattern: string
        }
        Insert: {
          created_at?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          name: string
          schema_fields?: Json | null
          template_name?: string | null
          updated_at?: string | null
          url_pattern: string
        }
        Update: {
          created_at?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          name?: string
          schema_fields?: Json | null
          template_name?: string | null
          updated_at?: string | null
          url_pattern?: string
        }
        Relationships: []
      }
      email_notification_log: {
        Row: {
          id: string
          provider: string
          reference_id: string
          sent_at: string
          type: string
        }
        Insert: {
          id?: string
          provider: string
          reference_id: string
          sent_at?: string
          type: string
        }
        Update: {
          id?: string
          provider?: string
          reference_id?: string
          sent_at?: string
          type?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string
          description: string | null
          html_template: string
          id: string
          is_active: boolean
          language: string
          metadata: Json
          subject_template: string
          template_key: string
          text_template: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          html_template: string
          id?: string
          is_active?: boolean
          language: string
          metadata?: Json
          subject_template: string
          template_key: string
          text_template: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          html_template?: string
          id?: string
          is_active?: boolean
          language?: string
          metadata?: Json
          subject_template?: string
          template_key?: string
          text_template?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_import_items: {
        Row: {
          all_day: boolean | null
          city: string | null
          country: string | null
          created_at: string
          currency: string | null
          dedupe_hash: string | null
          description: string | null
          end_date: string | null
          end_time: string | null
          error_message: string | null
          event_id: string | null
          external_id: string | null
          external_source: string | null
          extraction_method: string
          id: string
          location_address: string | null
          location_name: string | null
          price: string | null
          raw_payload: Json
          session_id: string
          source_id: string | null
          start_date: string | null
          start_time: string | null
          status: string
          title: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          all_day?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          dedupe_hash?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          error_message?: string | null
          event_id?: string | null
          external_id?: string | null
          external_source?: string | null
          extraction_method?: string
          id?: string
          location_address?: string | null
          location_name?: string | null
          price?: string | null
          raw_payload?: Json
          session_id: string
          source_id?: string | null
          start_date?: string | null
          start_time?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          all_day?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          dedupe_hash?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          error_message?: string | null
          event_id?: string | null
          external_id?: string | null
          external_source?: string | null
          extraction_method?: string
          id?: string
          location_address?: string | null
          location_name?: string | null
          price?: string | null
          raw_payload?: Json
          session_id?: string
          source_id?: string | null
          start_date?: string | null
          start_time?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_import_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_import_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "getyourguide_tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_import_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "party_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_import_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_import_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "viator_tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_import_items_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "event_import_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_import_items_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "event_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      event_import_sessions: {
        Row: {
          ai_completed_at: string | null
          ai_processed: number
          ai_started_at: string | null
          ai_status: string | null
          ai_updated: number
          completed_at: string | null
          config: Json
          created_at: string
          error_message: string | null
          geocoding_geocoded: number
          geocoding_processed: number
          geocoding_status: string | null
          id: string
          images_optimized: number
          images_processed: number
          images_status: string | null
          items_activated: number
          items_duplicates: number
          items_found: number
          items_inserted: number
          items_skipped: number
          manual_urls: Json | null
          source_id: string | null
          started_at: string
          status: string
          triggered_by: string | null
          updated_at: string
        }
        Insert: {
          ai_completed_at?: string | null
          ai_processed?: number
          ai_started_at?: string | null
          ai_status?: string | null
          ai_updated?: number
          completed_at?: string | null
          config?: Json
          created_at?: string
          error_message?: string | null
          geocoding_geocoded?: number
          geocoding_processed?: number
          geocoding_status?: string | null
          id?: string
          images_optimized?: number
          images_processed?: number
          images_status?: string | null
          items_activated?: number
          items_duplicates?: number
          items_found?: number
          items_inserted?: number
          items_skipped?: number
          manual_urls?: Json | null
          source_id?: string | null
          started_at?: string
          status?: string
          triggered_by?: string | null
          updated_at?: string
        }
        Update: {
          ai_completed_at?: string | null
          ai_processed?: number
          ai_started_at?: string | null
          ai_status?: string | null
          ai_updated?: number
          completed_at?: string | null
          config?: Json
          created_at?: string
          error_message?: string | null
          geocoding_geocoded?: number
          geocoding_processed?: number
          geocoding_status?: string | null
          id?: string
          images_optimized?: number
          images_processed?: number
          images_status?: string | null
          items_activated?: number
          items_duplicates?: number
          items_found?: number
          items_inserted?: number
          items_skipped?: number
          manual_urls?: Json | null
          source_id?: string | null
          started_at?: string
          status?: string
          triggered_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_import_sessions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "event_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      event_sources: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          last_error_at: string | null
          last_error_message: string | null
          last_success_at: string | null
          name: string
          parser_config: Json
          parser_type: string
          schedule_cron: string | null
          updated_at: string
          urls: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_error_at?: string | null
          last_error_message?: string | null
          last_success_at?: string | null
          name: string
          parser_config?: Json
          parser_type?: string
          schedule_cron?: string | null
          updated_at?: string
          urls?: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_error_at?: string | null
          last_error_message?: string | null
          last_success_at?: string | null
          name?: string
          parser_config?: Json
          parser_type?: string
          schedule_cron?: string | null
          updated_at?: string
          urls?: Json
        }
        Relationships: []
      }
      events: {
        Row: {
          all_day: boolean | null
          booking_url: string | null
          category_id: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string
          currency: string | null
          dedupe_hash: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          end_at: string | null
          end_date: string | null
          end_time: string | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          google_maps: string | null
          id: string
          images: Json | null
          imported_category_label: string | null
          is_active: boolean | null
          location: string | null
          metadata: Json | null
          opening_hours: Json | null
          price: string | null
          price_from: number | null
          rating: number | null
          recurrence: string[] | null
          recurrence_dates: Json | null
          review_count: number | null
          slug: string | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          start_at: string | null
          start_date: string | null
          start_time: string | null
          time_window: unknown | null
          title: string
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          all_day?: boolean | null
          booking_url?: string | null
          category_id?: string | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          currency?: string | null
          dedupe_hash?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          duration_hours?: number | null
          end_at?: string | null
          end_date?: string | null
          end_time?: string | null
          external_id?: string | null
          external_source?: string | null
          featured?: boolean | null
          google_maps?: string | null
          id?: string
          images?: Json | null
          imported_category_label?: string | null
          is_active?: boolean | null
          location?: string | null
          metadata?: Json | null
          opening_hours?: Json | null
          price?: string | null
          price_from?: number | null
          rating?: number | null
          recurrence?: string[] | null
          recurrence_dates?: Json | null
          review_count?: number | null
          slug?: string | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          start_at?: string | null
          start_date?: string | null
          start_time?: string | null
          time_window?: unknown | null
          title: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          all_day?: boolean | null
          booking_url?: string | null
          category_id?: string | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          currency?: string | null
          dedupe_hash?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          duration_hours?: number | null
          end_at?: string | null
          end_date?: string | null
          end_time?: string | null
          external_id?: string | null
          external_source?: string | null
          featured?: boolean | null
          google_maps?: string | null
          id?: string
          images?: Json | null
          imported_category_label?: string | null
          is_active?: boolean | null
          location?: string | null
          metadata?: Json | null
          opening_hours?: Json | null
          price?: string | null
          price_from?: number | null
          rating?: number | null
          recurrence?: string[] | null
          recurrence_dates?: Json | null
          review_count?: number | null
          slug?: string | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          start_at?: string | null
          start_date?: string | null
          start_time?: string | null
          time_window?: unknown | null
          title?: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          booking_url: string | null
          category_id: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string
          currency: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          id: string
          images: Json | null
          is_active: boolean | null
          location: string | null
          metadata: Json | null
          opening_hours: Json | null
          price_from: number | null
          rating: number | null
          review_count: number | null
          slug: string | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          title: string
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          booking_url?: string | null
          category_id?: string | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          currency?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          duration_hours?: number | null
          external_id?: string | null
          external_source?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          location?: string | null
          metadata?: Json | null
          opening_hours?: Json | null
          price_from?: number | null
          rating?: number | null
          review_count?: number | null
          slug?: string | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          title: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          booking_url?: string | null
          category_id?: string | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          currency?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          duration_hours?: number | null
          external_id?: string | null
          external_source?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          location?: string | null
          metadata?: Json | null
          opening_hours?: Json | null
          price_from?: number | null
          rating?: number | null
          review_count?: number | null
          slug?: string | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          title?: string
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
          url?: string | null
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
      google_api_cache: {
        Row: {
          cache_key: string
          created_at: string
          expires_at: string
          headers: Json | null
          hits: number
          last_access_at: string
          namespace: string
          response_json: Json | null
          status: number
          url: string
        }
        Insert: {
          cache_key: string
          created_at?: string
          expires_at: string
          headers?: Json | null
          hits?: number
          last_access_at?: string
          namespace?: string
          response_json?: Json | null
          status: number
          url: string
        }
        Update: {
          cache_key?: string
          created_at?: string
          expires_at?: string
          headers?: Json | null
          hits?: number
          last_access_at?: string
          namespace?: string
          response_json?: Json | null
          status?: number
          url?: string
        }
        Relationships: []
      }
      google_place_type_mappings: {
        Row: {
          category_id: string | null
          created_at: string
          google_type: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          google_type: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          google_type?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_place_type_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      import_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_details: Json | null
          id: string
          items_failed: number | null
          items_processed: number | null
          items_success: number | null
          metadata: Json | null
          operation: string
          source: string
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_details?: Json | null
          id?: string
          items_failed?: number | null
          items_processed?: number | null
          items_success?: number | null
          metadata?: Json | null
          operation: string
          source: string
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_details?: Json | null
          id?: string
          items_failed?: number | null
          items_processed?: number | null
          items_success?: number | null
          metadata?: Json | null
          operation?: string
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      place_owner_assignments: {
        Row: {
          activated_at: string
          business_profile_id: string
          created_at: string
          deactivated_at: string | null
          id: string
          is_active: boolean
          metadata: Json
          place_id: string
          source: string
        }
        Insert: {
          activated_at?: string
          business_profile_id: string
          created_at?: string
          deactivated_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json
          place_id: string
          source?: string
        }
        Update: {
          activated_at?: string
          business_profile_id?: string
          created_at?: string
          deactivated_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json
          place_id?: string
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "place_owner_assignments_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "place_owner_assignments_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      place_tag_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          place_id: string
          tag_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          place_id: string
          tag_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          place_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "place_tag_assignments_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "place_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "place_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      place_tags: {
        Row: {
          color: string | null
          created_at: string
          description_de: string | null
          description_en: string | null
          description_es: string | null
          icon: string | null
          id: string
          is_active: boolean
          label_de: string
          label_en: string
          label_es: string
          parent_id: string | null
          slug: string
          sort_order: number
          tag_kind: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          label_de: string
          label_en: string
          label_es: string
          parent_id?: string | null
          slug: string
          sort_order?: number
          tag_kind?: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          label_de?: string
          label_en?: string
          label_es?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
          tag_kind?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "place_tags_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "place_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address_components: Json | null
          booking_url: string | null
          business_status: string | null
          category_id: string | null
          category_resolution_candidates: Json | null
          category_resolution_confidence: number | null
          category_resolution_source: string | null
          category_review_status: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string
          cuisine_type: string | null
          currency: string | null
          data_source_version: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          fields_mask: string[] | null
          formatted_address: string | null
          google_photo_reference: string | null
          google_place_id: string | null
          id: string
          image_alt: string | null
          image_title: string | null
          image_url: string | null
          images: Json | null
          is_active: boolean | null
          last_synced_at: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          metadata: Json | null
          opening_hours: Json | null
          plus_code: Json | null
          price_from: number | null
          price_level: number | null
          rating: number | null
          review_count: number | null
          reviews_hidden: boolean
          seo: Json | null
          slug: string | null
          slug_de: string | null
          slug_en: string | null
          slug_es: string | null
          timezone: string | null
          title: string
          types: string[] | null
          updated_at: string
          utc_offset_minutes: number | null
          viewport: Json | null
        }
        Insert: {
          address_components?: Json | null
          booking_url?: string | null
          business_status?: string | null
          category_id?: string | null
          category_resolution_candidates?: Json | null
          category_resolution_confidence?: number | null
          category_resolution_source?: string | null
          category_review_status?: string | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          cuisine_type?: string | null
          currency?: string | null
          data_source_version?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          duration_hours?: number | null
          external_id?: string | null
          external_source?: string | null
          featured?: boolean | null
          fields_mask?: string[] | null
          formatted_address?: string | null
          google_photo_reference?: string | null
          google_place_id?: string | null
          id?: string
          image_alt?: string | null
          image_title?: string | null
          image_url?: string | null
          images?: Json | null
          is_active?: boolean | null
          last_synced_at?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          metadata?: Json | null
          opening_hours?: Json | null
          plus_code?: Json | null
          price_from?: number | null
          price_level?: number | null
          rating?: number | null
          review_count?: number | null
          reviews_hidden?: boolean
          seo?: Json | null
          slug?: string | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          timezone?: string | null
          title: string
          types?: string[] | null
          updated_at?: string
          utc_offset_minutes?: number | null
          viewport?: Json | null
        }
        Update: {
          address_components?: Json | null
          booking_url?: string | null
          business_status?: string | null
          category_id?: string | null
          category_resolution_candidates?: Json | null
          category_resolution_confidence?: number | null
          category_resolution_source?: string | null
          category_review_status?: string | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          cuisine_type?: string | null
          currency?: string | null
          data_source_version?: string | null
          description?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          duration_hours?: number | null
          external_id?: string | null
          external_source?: string | null
          featured?: boolean | null
          fields_mask?: string[] | null
          formatted_address?: string | null
          google_photo_reference?: string | null
          google_place_id?: string | null
          id?: string
          image_alt?: string | null
          image_title?: string | null
          image_url?: string | null
          images?: Json | null
          is_active?: boolean | null
          last_synced_at?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          metadata?: Json | null
          opening_hours?: Json | null
          plus_code?: Json | null
          price_from?: number | null
          price_level?: number | null
          rating?: number | null
          review_count?: number | null
          reviews_hidden?: boolean
          seo?: Json | null
          slug?: string | null
          slug_de?: string | null
          slug_en?: string | null
          slug_es?: string | null
          timezone?: string | null
          title?: string
          types?: string[] | null
          updated_at?: string
          utc_offset_minutes?: number | null
          viewport?: Json | null
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
      platform_stats_cache: {
        Row: {
          cache_key: string
          computed_at: string
          total_entries: number
          total_reviews: number
        }
        Insert: {
          cache_key: string
          computed_at?: string
          total_entries: number
          total_reviews: number
        }
        Update: {
          cache_key?: string
          computed_at?: string
          total_entries?: number
          total_reviews?: number
        }
        Relationships: []
      }
      platform_stats_history: {
        Row: {
          computed_at: string
          recorded_for: string
          total_entries: number
          total_reviews: number
        }
        Insert: {
          computed_at?: string
          recorded_for: string
          total_entries: number
          total_reviews: number
        }
        Update: {
          computed_at?: string
          recorded_for?: string
          total_entries?: number
          total_reviews?: number
        }
        Relationships: []
      }
      public_holidays_cache: {
        Row: {
          country_code: string
          created_at: string
          date: string
          english_name: string
          id: string
          local_name: string
          region_code: string | null
          updated_at: string
          year: number
        }
        Insert: {
          country_code: string
          created_at?: string
          date: string
          english_name: string
          id?: string
          local_name: string
          region_code?: string | null
          updated_at?: string
          year: number
        }
        Update: {
          country_code?: string
          created_at?: string
          date?: string
          english_name?: string
          id?: string
          local_name?: string
          region_code?: string | null
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      review_dispute_requests: {
        Row: {
          business_profile_id: string
          created_at: string
          id: string
          metadata: Json | null
          place_id: string
          portal_review_id: string | null
          provider_review_ref: string | null
          reason: string | null
          status: string
          updated_at: string
        }
        Insert: {
          business_profile_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          place_id: string
          portal_review_id?: string | null
          provider_review_ref?: string | null
          reason?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          business_profile_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          place_id?: string
          portal_review_id?: string | null
          provider_review_ref?: string | null
          reason?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_dispute_requests_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_dispute_requests_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_dispute_requests_portal_review_id_fkey"
            columns: ["portal_review_id"]
            isOneToOne: false
            referencedRelation: "portal_review_media"
            referencedColumns: ["review_id"]
          },
          {
            foreignKeyName: "review_dispute_requests_portal_review_id_fkey"
            columns: ["portal_review_id"]
            isOneToOne: false
            referencedRelation: "portal_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_dispute_requests_portal_review_id_fkey"
            columns: ["portal_review_id"]
            isOneToOne: false
            referencedRelation: "user_review_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      review_media: {
        Row: {
          content_hash: string | null
          created_at: string
          duration_seconds: number | null
          entity_id: string
          entity_type: string
          height: number | null
          id: string
          media_type: string
          metadata: Json
          mime_type: string | null
          phash: string | null
          public_url: string
          status: string
          storage_bucket: string
          storage_path: string
          submission_id: string
          updated_at: string
          width: number | null
        }
        Insert: {
          content_hash?: string | null
          created_at?: string
          duration_seconds?: number | null
          entity_id: string
          entity_type: string
          height?: number | null
          id?: string
          media_type: string
          metadata?: Json
          mime_type?: string | null
          phash?: string | null
          public_url: string
          status?: string
          storage_bucket: string
          storage_path: string
          submission_id: string
          updated_at?: string
          width?: number | null
        }
        Update: {
          content_hash?: string | null
          created_at?: string
          duration_seconds?: number | null
          entity_id?: string
          entity_type?: string
          height?: number | null
          id?: string
          media_type?: string
          metadata?: Json
          mime_type?: string | null
          phash?: string | null
          public_url?: string
          status?: string
          storage_bucket?: string
          storage_path?: string
          submission_id?: string
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "review_media_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "portal_review_media"
            referencedColumns: ["review_id"]
          },
          {
            foreignKeyName: "review_media_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "portal_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_media_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "user_review_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      route_redirects: {
        Row: {
          created_at: string
          created_by: string | null
          hit_count: number
          http_status: number
          id: string
          is_active: boolean
          last_hit_at: string | null
          note: string | null
          source_path: string
          target_path: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          hit_count?: number
          http_status?: number
          id?: string
          is_active?: boolean
          last_hit_at?: string | null
          note?: string | null
          source_path: string
          target_path: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          hit_count?: number
          http_status?: number
          id?: string
          is_active?: boolean
          last_hit_at?: string | null
          note?: string | null
          source_path?: string
          target_path?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      search_index_queue: {
        Row: {
          attempt_count: number
          created_at: string
          error_message: string | null
          id: string
          last_attempt_at: string | null
          next_attempt_at: string
          notified_at: string | null
          payload: Json | null
          record_id: string
          source_table: string
          status: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          next_attempt_at?: string
          notified_at?: string | null
          payload?: Json | null
          record_id: string
          source_table: string
          status?: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          created_at?: string
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          next_attempt_at?: string
          notified_at?: string | null
          payload?: Json | null
          record_id?: string
          source_table?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      sync_global_settings: {
        Row: {
          created_at: string
          full_sync_freq_days: number
          id: string
          opening_hours_freq_days: number
          reviews_count: number
          reviews_freq_days: number
          source: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_sync_freq_days?: number
          id?: string
          opening_hours_freq_days?: number
          reviews_count?: number
          reviews_freq_days?: number
          source: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_sync_freq_days?: number
          id?: string
          opening_hours_freq_days?: number
          reviews_count?: number
          reviews_freq_days?: number
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      sync_settings: {
        Row: {
          created_at: string
          enabled: boolean
          freq_full: string
          freq_new_items: string
          freq_opening_hours: string
          freq_reviews: string
          id: string
          last_run_full: string | null
          last_run_new_items: string | null
          last_run_opening_hours: string | null
          last_run_reviews: string | null
          limit_per_run: number | null
          location_text: string | null
          query_text: string | null
          source: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          freq_full?: string
          freq_new_items?: string
          freq_opening_hours?: string
          freq_reviews?: string
          id?: string
          last_run_full?: string | null
          last_run_new_items?: string | null
          last_run_opening_hours?: string | null
          last_run_reviews?: string | null
          limit_per_run?: number | null
          location_text?: string | null
          query_text?: string | null
          source: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          freq_full?: string
          freq_new_items?: string
          freq_opening_hours?: string
          freq_reviews?: string
          id?: string
          last_run_full?: string | null
          last_run_new_items?: string | null
          last_run_opening_hours?: string | null
          last_run_reviews?: string | null
          limit_per_run?: number | null
          location_text?: string | null
          query_text?: string | null
          source?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_review_submissions: {
        Row: {
          comment: string | null
          display_name: string | null
          entity_id: string
          entity_type: string
          id: string
          language: string | null
          metadata: Json
          rating: number
          status: string
          submitted_at: string
          submitter_email: string
          submitter_email_hash: string
          submitter_ip: unknown | null
          updated_at: string
          verification_sent_at: string | null
          verification_token: string
          verified_at: string | null
        }
        Insert: {
          comment?: string | null
          display_name?: string | null
          entity_id: string
          entity_type: string
          id?: string
          language?: string | null
          metadata?: Json
          rating: number
          status?: string
          submitted_at?: string
          submitter_email: string
          submitter_email_hash: string
          submitter_ip?: unknown | null
          updated_at?: string
          verification_sent_at?: string | null
          verification_token?: string
          verified_at?: string | null
        }
        Update: {
          comment?: string | null
          display_name?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          language?: string | null
          metadata?: Json
          rating?: number
          status?: string
          submitted_at?: string
          submitter_email?: string
          submitter_email_hash?: string
          submitter_ip?: unknown | null
          updated_at?: string
          verification_sent_at?: string | null
          verification_token?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      viator_categories: {
        Row: {
          created_at: string
          external_id: number
          group_id: number | null
          id: string
          lang: string
          slug: string
          subcategory: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id: number
          group_id?: number | null
          id?: string
          lang?: string
          slug: string
          subcategory: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: number
          group_id?: number | null
          id?: string
          lang?: string
          slug?: string
          subcategory?: string
          updated_at?: string
        }
        Relationships: []
      }
      viator_category_mappings: {
        Row: {
          category_id: string
          created_at: string
          id: string
          updated_at: string
          viator_external_id: number
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          updated_at?: string
          viator_external_id: number
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          viator_external_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "viator_category_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "viator_category_mappings_viator_external_id_fkey"
            columns: ["viator_external_id"]
            isOneToOne: true
            referencedRelation: "viator_categories"
            referencedColumns: ["external_id"]
          },
        ]
      }
    }
    Views: {
      getyourguide_tours: {
        Row: {
          all_day: boolean | null
          booking_url: string | null
          category_id: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string | null
          currency: string | null
          dedupe_hash: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          end_date: string | null
          end_time: string | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          google_maps: string | null
          id: string | null
          images: Json | null
          imported_category_label: string | null
          is_active: boolean | null
          location: string | null
          metadata: Json | null
          opening_hours: Json | null
          price: string | null
          price_from: number | null
          rating: number | null
          recurrence: string[] | null
          review_count: number | null
          slug: string | null
          start_date: string | null
          start_time: string | null
          title: string | null
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      party_events: {
        Row: {
          booking_url: string | null
          category_id: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string | null
          currency: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          id: string | null
          images: Json | null
          is_active: boolean | null
          location: string | null
          metadata: Json | null
          opening_hours: Json | null
          price_from: number | null
          rating: number | null
          review_count: number | null
          title: string | null
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_review_media: {
        Row: {
          content_hash: string | null
          created_at: string | null
          duration_seconds: number | null
          entity_id: string | null
          entity_type: string | null
          height: number | null
          id: string | null
          metadata: Json | null
          mime_type: string | null
          phash: string | null
          review_id: string | null
          type: string | null
          url: string | null
          width: number | null
        }
        Relationships: []
      }
      portal_reviews: {
        Row: {
          comment: string | null
          display_name: string | null
          entity_id: string | null
          entity_type: string | null
          id: string | null
          language: string | null
          metadata: Json | null
          rating: number | null
          submitted_at: string | null
          verified_at: string | null
        }
        Insert: {
          comment?: string | null
          display_name?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string | null
          language?: string | null
          metadata?: Json | null
          rating?: number | null
          submitted_at?: string | null
          verified_at?: string | null
        }
        Update: {
          comment?: string | null
          display_name?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string | null
          language?: string | null
          metadata?: Json | null
          rating?: number | null
          submitted_at?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          all_day: boolean | null
          booking_url: string | null
          category_id: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string | null
          currency: string | null
          dedupe_hash: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          end_date: string | null
          end_time: string | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          google_maps: string | null
          id: string | null
          images: Json | null
          imported_category_label: string | null
          is_active: boolean | null
          location: string | null
          metadata: Json | null
          opening_hours: Json | null
          price: string | null
          price_from: number | null
          rating: number | null
          recurrence: string[] | null
          review_count: number | null
          slug: string | null
          start_date: string | null
          start_time: string | null
          title: string | null
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      viator_tours: {
        Row: {
          all_day: boolean | null
          booking_url: string | null
          category_id: string | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string | null
          currency: string | null
          dedupe_hash: string | null
          description: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          duration_hours: number | null
          end_date: string | null
          end_time: string | null
          external_id: string | null
          external_source: string | null
          featured: boolean | null
          google_maps: string | null
          id: string | null
          images: Json | null
          imported_category_label: string | null
          is_active: boolean | null
          location: string | null
          metadata: Json | null
          opening_hours: Json | null
          price: string | null
          price_from: number | null
          rating: number | null
          recurrence: string[] | null
          review_count: number | null
          slug: string | null
          start_date: string | null
          start_time: string | null
          title: string | null
          title_de: string | null
          title_en: string | null
          title_es: string | null
          updated_at: string | null
          url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_admin_user: {
        Args: { admin_email: string }
        Returns: string
      }
      dedupe_images_jsonb: {
        Args: { value: Json }
        Returns: Json
      }
      events_in_window: {
        Args: {
          p_category?: string
          p_from?: string
          p_limit?: number
          p_offset?: number
          p_q?: string
          p_to?: string
        }
        Returns: {
          all_day: boolean
          category_id: string
          coordinates: Json
          currency: string
          description: string
          end_at: string
          end_date: string
          end_time: string
          external_source: string
          id: string
          images: Json
          location: string
          metadata: Json
          price: string
          slug: string
          start_at: string
          start_date: string
          start_time: string
          title: string
          title_de: string
          title_en: string
          title_es: string
          url: string
        }[]
      }
      generate_event_slugs_function: {
        Args: Record<PropertyKey, never>
        Returns: {
          message: string
          processed: number
          updated: number
        }[]
      }
      generate_google_photo_url: {
        Args: { max_width?: number; photo_reference: string }
        Returns: string
      }
      generate_place_slug: {
        Args: { title_text: string }
        Returns: string
      }
      generate_slug_from_title: {
        Args: { title_text: string }
        Returns: string
      }
      get_due_event_sources: {
        Args: Record<PropertyKey, never>
        Returns: {
          hours_since_last_run: number
          id: string
          last_success_at: string
          name: string
          schedule_cron: string
          urls: Json
        }[]
      }
      get_platform_stats: {
        Args: { force?: boolean }
        Returns: {
          computed_at: string
          total_entries: number
          total_reviews: number
        }[]
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      local_ts_eu_madrid: {
        Args: { d: string; t: string } | { d: string; t: string }
        Returns: string
      }
      normalize_image_url: {
        Args: { raw_url: string }
        Returns: string
      }
      optimize_place_image: {
        Args: { image_url_param: string; place_id_param: string }
        Returns: Json
      }
      slugify_locale_text: {
        Args: { input: string }
        Returns: string
      }
      slugify_with_suffix: {
        Args: { fallback_slug: string; meta_title: string }
        Returns: string
      }
      trigger_scheduled_event_imports: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      unaccent: {
        Args: { "": string }
        Returns: string
      }
      unaccent_init: {
        Args: { "": unknown }
        Returns: unknown
      }
    }
    Enums: {
      business_addon_type: "one_time" | "auction"
      business_claim_payment_status:
        | "unpaid"
        | "processing"
        | "paid"
        | "refunded"
      business_claim_status:
        | "draft"
        | "awaiting_payment"
        | "pending_review"
        | "approved"
        | "rejected"
        | "cancelled"
      business_claim_verification_status: "pending" | "approved" | "rejected"
      business_profile_status:
        | "draft"
        | "pending_review"
        | "active"
        | "suspended"
      business_subscription_interval: "monthly" | "annual"
      business_subscription_status:
        | "inactive"
        | "active"
        | "past_due"
        | "canceled"
    }
    CompositeTypes: {
      [_ in never]: never
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
    Enums: {
      business_addon_type: ["one_time", "auction"],
      business_claim_payment_status: [
        "unpaid",
        "processing",
        "paid",
        "refunded",
      ],
      business_claim_status: [
        "draft",
        "awaiting_payment",
        "pending_review",
        "approved",
        "rejected",
        "cancelled",
      ],
      business_claim_verification_status: ["pending", "approved", "rejected"],
      business_profile_status: [
        "draft",
        "pending_review",
        "active",
        "suspended",
      ],
      business_subscription_interval: ["monthly", "annual"],
      business_subscription_status: [
        "inactive",
        "active",
        "past_due",
        "canceled",
      ],
    },
  },
} as const
