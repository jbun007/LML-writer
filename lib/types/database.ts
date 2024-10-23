export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  normalized_data: {
    Tables: {
      text_chunk: {
        Row: {
          categories: string[] | null
          created_at: string | null
          id: string
          name: string | null
          reference_numbers: string[] | null
          scraped_supplement_hero_id: string | null
          scraped_text_chunk_id: string | null
          source: string | null
          source_last_updated_at: string | null
          text: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          categories?: string[] | null
          created_at?: string | null
          id: string
          name?: string | null
          reference_numbers?: string[] | null
          scraped_supplement_hero_id?: string | null
          scraped_text_chunk_id?: string | null
          source?: string | null
          source_last_updated_at?: string | null
          text: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          categories?: string[] | null
          created_at?: string | null
          id?: string
          name?: string | null
          reference_numbers?: string[] | null
          scraped_supplement_hero_id?: string | null
          scraped_text_chunk_id?: string | null
          source?: string | null
          source_last_updated_at?: string | null
          text?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      text_chunk_embeddings: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string
          name_embedding: string | null
          text_chunk_id: string | null
          title_embedding: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          name_embedding?: string | null
          text_chunk_id?: string | null
          title_embedding?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          name_embedding?: string | null
          text_chunk_id?: string | null
          title_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_text_chunk"
            columns: ["text_chunk_id"]
            isOneToOne: true
            referencedRelation: "text_chunk"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_chunk_embeddings_text_chunk_id_fkey"
            columns: ["text_chunk_id"]
            isOneToOne: true
            referencedRelation: "text_chunk"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      application_instruction: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          instruction: string | null
          product_usage_id: string
          time_of_day: unknown | null
          type_body_area_id: string
          type_condition_id: string | null
          type_frequency_id: string
          type_method_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          instruction?: string | null
          product_usage_id: string
          time_of_day?: unknown | null
          type_body_area_id: string
          type_condition_id?: string | null
          type_frequency_id: string
          type_method_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          instruction?: string | null
          product_usage_id?: string
          time_of_day?: unknown | null
          type_body_area_id?: string
          type_condition_id?: string | null
          type_frequency_id?: string
          type_method_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_instruction_type_method_id_fkey"
            columns: ["type_method_id"]
            isOneToOne: false
            referencedRelation: "type_method"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_instructions_product_usage_id_fkey"
            columns: ["product_usage_id"]
            isOneToOne: false
            referencedRelation: "product_usage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_instructions_type_body_area_id_fkey"
            columns: ["type_body_area_id"]
            isOneToOne: false
            referencedRelation: "type_body_area"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_instructions_type_condition_id_fkey"
            columns: ["type_condition_id"]
            isOneToOne: false
            referencedRelation: "type_condition"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_instructions_type_frequency_id_fkey"
            columns: ["type_frequency_id"]
            isOneToOne: false
            referencedRelation: "type_frequency"
            referencedColumns: ["id"]
          },
        ]
      }
      beta_user: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          content: string
          created_at: string
          description: string | null
          id: string
          keywords: string[] | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      brand: {
        Row: {
          brand_type_id: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          brand_type_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          brand_type_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_brand_type"
            columns: ["brand_type_id"]
            isOneToOne: false
            referencedRelation: "brand_type"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_type: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      category_type: {
        Row: {
          id: number
          type_name: string
        }
        Insert: {
          id?: number
          type_name: string
        }
        Update: {
          id?: number
          type_name?: string
        }
        Relationships: []
      }
      chemical: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      evidence: {
        Row: {
          created_at: string | null
          health_outcome_id: string
          id: string
          overall_potential: string | null
          participants: number
          studies: number
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          health_outcome_id: string
          id?: string
          overall_potential?: string | null
          participants: number
          studies: number
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          health_outcome_id?: string
          id?: string
          overall_potential?: string | null
          participants?: number
          studies?: number
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_health_outcome_id_fkey"
            columns: ["health_outcome_id"]
            isOneToOne: false
            referencedRelation: "health_outcome"
            referencedColumns: ["id"]
          },
        ]
      }
      guidance: {
        Row: {
          created_at: string | null
          id: string
          stack_id: string | null
          text: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          stack_id?: string | null
          text?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          stack_id?: string | null
          text?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guidance_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: true
            referencedRelation: "stack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guidance_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: true
            referencedRelation: "stack_page_view"
            referencedColumns: ["id"]
          },
        ]
      }
      guidance_task_join: {
        Row: {
          created_at: string | null
          guidance_id: string
          id: string
          task_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          guidance_id: string
          id?: string
          task_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          guidance_id?: string
          id?: string
          task_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guidance_task_join_guidance_id_fkey"
            columns: ["guidance_id"]
            isOneToOne: false
            referencedRelation: "guidance"
            referencedColumns: ["id"]
          },
        ]
      }
      health_condition: {
        Row: {
          created_at: string | null
          id: string
          name: string
          number_of_outcomes: number | null
          number_of_studies: number | null
          supplement_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          number_of_outcomes?: number | null
          number_of_studies?: number | null
          supplement_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          number_of_outcomes?: number | null
          number_of_studies?: number | null
          supplement_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_condition_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
        ]
      }
      health_outcome: {
        Row: {
          created_at: string | null
          effect: string | null
          grade: string | null
          health_condition_id: string
          id: string
          name: string
          reference_href: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          effect?: string | null
          grade?: string | null
          health_condition_id: string
          id?: string
          name: string
          reference_href?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          effect?: string | null
          grade?: string | null
          health_condition_id?: string
          id?: string
          name?: string
          reference_href?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_outcome_health_condition_id_fkey"
            columns: ["health_condition_id"]
            isOneToOne: false
            referencedRelation: "health_condition"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient: {
        Row: {
          chemical_id: string | null
          created_at: string | null
          id: string
          is_active: boolean
          name: string
          supplement_id: string | null
          updated_at: string | null
        }
        Insert: {
          chemical_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          supplement_id?: string | null
          updated_at?: string | null
        }
        Update: {
          chemical_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          supplement_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_chemical"
            columns: ["chemical_id"]
            isOneToOne: true
            referencedRelation: "chemical"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ingredient_chemical"
            columns: ["chemical_id"]
            isOneToOne: true
            referencedRelation: "chemical"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ingredient_supplement"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_ingredient_type_join: {
        Row: {
          ingredient_id: string
          ingredient_type_id: string
        }
        Insert: {
          ingredient_id: string
          ingredient_type_id: string
        }
        Update: {
          ingredient_id?: string
          ingredient_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ingredient"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ingredient_type"
            columns: ["ingredient_type_id"]
            isOneToOne: false
            referencedRelation: "ingredient_type"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_type: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      preference: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      price: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          per_quantity: number | null
          product_id: string
          unit: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          per_quantity?: number | null
          product_id: string
          unit: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          per_quantity?: number | null
          product_id?: string
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "price_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product: {
        Row: {
          author_id: string | null
          brand_id: string | null
          cover_image_url: string | null
          created_at: string | null
          id: string
          name: string
          product_score: number
          product_type_id: string | null
          product_usage_id: string | null
          scraped_url: string | null
          short_description: string | null
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          brand_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          name: string
          product_score?: number
          product_type_id?: string | null
          product_usage_id?: string | null
          scraped_url?: string | null
          short_description?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          brand_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
          product_score?: number
          product_type_id?: string | null
          product_usage_id?: string | null
          scraped_url?: string | null
          short_description?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_type"
            columns: ["product_type_id"]
            isOneToOne: false
            referencedRelation: "product_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_product_usage_id_fkey"
            columns: ["product_usage_id"]
            isOneToOne: false
            referencedRelation: "product_usage"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category: {
        Row: {
          category_type_id: number | null
          created_at: string | null
          id: string
          name: string
          supplement_id: string | null
          updated_at: string | null
        }
        Insert: {
          category_type_id?: number | null
          created_at?: string | null
          id?: string
          name: string
          supplement_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category_type_id?: number | null
          created_at?: string | null
          id?: string
          name?: string
          supplement_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_category_category_type"
            columns: ["category_type_id"]
            isOneToOne: false
            referencedRelation: "category_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_product_category_supplement"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
        ]
      }
      product_category_join: {
        Row: {
          created_at: string | null
          is_format: boolean
          is_main: boolean
          product_category_id: string
          product_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          is_format?: boolean
          is_main?: boolean
          product_category_id: string
          product_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          is_format?: boolean
          is_main?: boolean
          product_category_id?: string
          product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_assignment_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_assignment_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_assignment_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_category_assignment_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_image: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: string
          image_url: string
          is_cover: boolean | null
          product_id: string
          sort_order: number
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_cover?: boolean | null
          product_id: string
          sort_order?: number
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_cover?: boolean | null
          product_id?: string
          sort_order?: number
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_image_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_image_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_image_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_information: {
        Row: {
          created_at: string | null
          id: string
          long_description: Json | null
          product_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          long_description?: Json | null
          product_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          long_description?: Json | null
          product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_information_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_information_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_information_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_ingredient_join: {
        Row: {
          ingredient_id: string
          product_id: string
        }
        Insert: {
          ingredient_id: string
          product_id: string
        }
        Update: {
          ingredient_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_ingredient_join_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_ingredient_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_ingredient_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_ingredient_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_preference_join: {
        Row: {
          preference_id: string
          product_id: string
        }
        Insert: {
          preference_id: string
          product_id: string
        }
        Update: {
          preference_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_preference_join_preference_id_fkey"
            columns: ["preference_id"]
            isOneToOne: false
            referencedRelation: "preference"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_preference_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_preference_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_preference_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_rankings: {
        Row: {
          category_and_format_rank: number | null
          category_rank: number | null
          format_rank: number | null
          product_id: string
          updated_at: string | null
        }
        Insert: {
          category_and_format_rank?: number | null
          category_rank?: number | null
          format_rank?: number | null
          product_id: string
          updated_at?: string | null
        }
        Update: {
          category_and_format_rank?: number | null
          category_rank?: number | null
          format_rank?: number | null
          product_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_skincare_field: {
        Row: {
          created_at: string | null
          id: string
          ph_range: number[] | null
          product_id: string
          regimen_step: string | null
          regimen_step_description: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ph_range?: number[] | null
          product_id: string
          regimen_step?: string | null
          regimen_step_description?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ph_range?: number[] | null
          product_id?: string
          regimen_step?: string | null
          regimen_step_description?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_skincare_field_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_skincare_field_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_skincare_field_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_type: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      product_type_product_category_join: {
        Row: {
          product_category_id: string
          product_type_id: string
        }
        Insert: {
          product_category_id: string
          product_type_id: string
        }
        Update: {
          product_category_id?: string
          product_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_type_category_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_type_category_product_type_id_fkey"
            columns: ["product_type_id"]
            isOneToOne: false
            referencedRelation: "product_type"
            referencedColumns: ["id"]
          },
        ]
      }
      product_type_use_case_join: {
        Row: {
          product_type_id: string
          use_case_id: string
        }
        Insert: {
          product_type_id: string
          use_case_id: string
        }
        Update: {
          product_type_id?: string
          use_case_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_type_use_case_product_type_id_fkey"
            columns: ["product_type_id"]
            isOneToOne: false
            referencedRelation: "product_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_type_use_case_use_case_id_fkey"
            columns: ["use_case_id"]
            isOneToOne: false
            referencedRelation: "use_case"
            referencedColumns: ["id"]
          },
        ]
      }
      product_usage: {
        Row: {
          created_at: string | null
          expires_in_months: number | null
          id: string
          product_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_in_months?: number | null
          id?: string
          product_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_in_months?: number | null
          id?: string
          product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_usage_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_usage_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_usage_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_usage_do_not_use_with_join: {
        Row: {
          id: string
          product_category_id: string
          product_usage_id: string
        }
        Insert: {
          id?: string
          product_category_id: string
          product_usage_id: string
        }
        Update: {
          id?: string
          product_category_id?: string
          product_usage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_usage_do_not_use_with_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
        ]
      }
      product_use_case_join: {
        Row: {
          product_id: string
          use_case_id: string
        }
        Insert: {
          product_id: string
          use_case_id: string
        }
        Update: {
          product_id?: string
          use_case_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_use_case_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_use_case_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_use_case_join_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_use_case_join_use_case_id_fkey"
            columns: ["use_case_id"]
            isOneToOne: false
            referencedRelation: "use_case"
            referencedColumns: ["id"]
          },
        ]
      }
      stack: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          guidance_id: string | null
          id: string
          is_public: boolean
          name: string
          parent_stack_id: string | null
          slug: string | null
          stack_type: Database["public"]["Enums"]["stack_type"]
          status: Database["public"]["Enums"]["stack_status"]
          tracking_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          guidance_id?: string | null
          id?: string
          is_public?: boolean
          name: string
          parent_stack_id?: string | null
          slug?: string | null
          stack_type: Database["public"]["Enums"]["stack_type"]
          status?: Database["public"]["Enums"]["stack_status"]
          tracking_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          guidance_id?: string | null
          id?: string
          is_public?: boolean
          name?: string
          parent_stack_id?: string | null
          slug?: string | null
          stack_type?: Database["public"]["Enums"]["stack_type"]
          status?: Database["public"]["Enums"]["stack_status"]
          tracking_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stack_guidance_id_fkey"
            columns: ["guidance_id"]
            isOneToOne: false
            referencedRelation: "guidance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_parent_stack_id_fkey"
            columns: ["parent_stack_id"]
            isOneToOne: false
            referencedRelation: "stack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_parent_stack_id_fkey"
            columns: ["parent_stack_id"]
            isOneToOne: false
            referencedRelation: "stack_page_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_tracking_id_fkey"
            columns: ["tracking_id"]
            isOneToOne: false
            referencedRelation: "tracking"
            referencedColumns: ["tracking_id"]
          },
        ]
      }
      stack_product_join: {
        Row: {
          created_at: string | null
          id: string
          modified_by: string
          product_id: string
          product_weight: number | null
          stack_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          modified_by?: string
          product_id: string
          product_weight?: number | null
          stack_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          modified_by?: string
          product_id?: string
          product_weight?: number | null
          stack_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stack_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_details_to_stack"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stack_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stack_product_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: false
            referencedRelation: "stack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_product_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: false
            referencedRelation: "stack_page_view"
            referencedColumns: ["id"]
          },
        ]
      }
      study: {
        Row: {
          age: string | null
          body_types: string | null
          created_at: string | null
          effect: string | null
          id: string
          number_of_participants: number | null
          sex: string | null
          source_href: string
          summary: string | null
          title: string
          trial_design: string | null
          trial_length: string | null
          updated_at: string | null
        }
        Insert: {
          age?: string | null
          body_types?: string | null
          created_at?: string | null
          effect?: string | null
          id?: string
          number_of_participants?: number | null
          sex?: string | null
          source_href: string
          summary?: string | null
          title: string
          trial_design?: string | null
          trial_length?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: string | null
          body_types?: string | null
          created_at?: string | null
          effect?: string | null
          id?: string
          number_of_participants?: number | null
          sex?: string | null
          source_href?: string
          summary?: string | null
          title?: string
          trial_design?: string | null
          trial_length?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      study_evidence_join: {
        Row: {
          evidence_id: string
          study_id: string
        }
        Insert: {
          evidence_id: string
          study_id: string
        }
        Update: {
          evidence_id?: string
          study_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_evidence_join_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_evidence_join_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "study"
            referencedColumns: ["id"]
          },
        ]
      }
      supplement: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      supplement_alias: {
        Row: {
          alias: string
          created_at: string
          id: string
          supplement_id: string
          updated_at: string
        }
        Insert: {
          alias: string
          created_at?: string
          id?: string
          supplement_id: string
          updated_at?: string
        }
        Update: {
          alias?: string
          created_at?: string
          id?: string
          supplement_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplement_alias_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
        ]
      }
      supplement_group: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      supplement_mapping_log: {
        Row: {
          action: string
          id: number
          ingredient_name: string
          mapped_at: string | null
          supplement_id: string
        }
        Insert: {
          action: string
          id?: number
          ingredient_name: string
          mapped_at?: string | null
          supplement_id: string
        }
        Update: {
          action?: string
          id?: number
          ingredient_name?: string
          mapped_at?: string | null
          supplement_id?: string
        }
        Relationships: []
      }
      supplement_supplement_group_join: {
        Row: {
          created_at: string
          group_id: string
          supplement_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          supplement_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          supplement_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplement_supplement_group_join_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "supplement_group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplement_supplement_group_join_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
        ]
      }
      supplement_use_case_join: {
        Row: {
          created_at: string | null
          ingredient_id: string | null
          supplement_id: string
          updated_at: string | null
          use_case_id: string
        }
        Insert: {
          created_at?: string | null
          ingredient_id?: string | null
          supplement_id: string
          updated_at?: string | null
          use_case_id: string
        }
        Update: {
          created_at?: string | null
          ingredient_id?: string | null
          supplement_id?: string
          updated_at?: string | null
          use_case_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplement_use_case_join_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplement_use_case_join_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplement_use_case_join_use_case_id_fkey"
            columns: ["use_case_id"]
            isOneToOne: false
            referencedRelation: "use_case"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking: {
        Row: {
          created_at: string | null
          id: string
          tracking_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          tracking_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          tracking_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      type_body_area: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      type_condition: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      type_frequency: {
        Row: {
          description: string
          id: string
          interval_value: unknown
        }
        Insert: {
          description: string
          id?: string
          interval_value: unknown
        }
        Update: {
          description?: string
          id?: string
          interval_value?: unknown
        }
        Relationships: []
      }
      type_method: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      use_case: {
        Row: {
          created_at: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["use_case_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          type?: Database["public"]["Enums"]["use_case_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["use_case_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      warnings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          product_usage_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          product_usage_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          product_usage_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "warnings_product_usage_id_fkey"
            columns: ["product_usage_id"]
            isOneToOne: false
            referencedRelation: "product_usage"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      daily_stacks_activated: {
        Row: {
          activation_date: string | null
          stacks_activated: number | null
          user_id: string | null
        }
        Relationships: []
      }
      product_details_to_stack: {
        Row: {
          active_ingredients: Json | null
          application_instructions: Json | null
          categories: Json | null
          cover_image_url: string | null
          created_at: string | null
          images: Json | null
          prices: Json | null
          product_id: string | null
          product_name: string | null
          product_scores: Json | null
          product_short_description: string | null
          slug: string | null
          updated_at: string | null
          use_cases: Json | null
        }
        Relationships: []
      }
      product_view: {
        Row: {
          active_ingredients: Json | null
          application_instructions: Json | null
          brand: Json | null
          categories: Json | null
          category_and_format_rank: number | null
          category_rank: number | null
          cost_effectiveness_score: number | null
          cover_image_url: string | null
          created_at: string | null
          effectiveness_score: number | null
          format_rank: number | null
          images: Json | null
          inactive_ingredients: Json | null
          long_description: Json | null
          main_category: Json | null
          main_format: Json | null
          overall_score: number | null
          preferences: Json | null
          prices: Json | null
          product_id: string | null
          product_name: string | null
          product_short_description: string | null
          safety_score: number | null
          skincare_fields: Json | null
          slug: string | null
          updated_at: string | null
          usage_information: Json | null
          use_cases: Json | null
          user_satisfaction_score: number | null
        }
        Relationships: []
      }
      stack_page_view: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          guidance: Json | null
          id: string | null
          is_public: boolean | null
          name: string | null
          parent_stack: Json | null
          parent_stack_id: string | null
          posts: Json | null
          products: Json | null
          slug: string | null
          stack_score: number | null
          stack_type: Database["public"]["Enums"]["stack_type"] | null
          status: Database["public"]["Enums"]["stack_status"] | null
          task_activity_grid: Json | null
          teams: Json | null
          tracking_id: string | null
          updated_at: string | null
          user_id: string | null
          users: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "stack_parent_stack_id_fkey"
            columns: ["parent_stack_id"]
            isOneToOne: false
            referencedRelation: "stack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_parent_stack_id_fkey"
            columns: ["parent_stack_id"]
            isOneToOne: false
            referencedRelation: "stack_page_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_tracking_id_fkey"
            columns: ["tracking_id"]
            isOneToOne: false
            referencedRelation: "tracking"
            referencedColumns: ["tracking_id"]
          },
        ]
      }
    }
    Functions: {
      create_product_with_related_data: {
        Args: {
          p_name: string
          p_brand_id: string
          p_product_type_id: string
          p_short_description: string
          p_cover_image_url: string
          p_scraped_url: string
          p_long_description: string
          p_image_urls: string[]
          p_use_case_ids: string[]
          p_main_ingredient: string
          p_product_category_format: string[]
          p_product_category: string[]
          p_ingredients: string[]
        }
        Returns: string
      }
      dmetaphone: {
        Args: {
          "": string
        }
        Returns: string
      }
      dmetaphone_alt: {
        Args: {
          "": string
        }
        Returns: string
      }
      insert_aliases_from_scraped: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      map_ingredient_to_supplement: {
        Args: {
          ingredient_name: string
        }
        Returns: string
      }
      process_supplement_section_chunks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      soundex: {
        Args: {
          "": string
        }
        Returns: string
      }
      text_soundex: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      chunking_method_enum:
        | "split by paragraphs"
        | "split by references sups"
        | "split by paragraphs and lis"
        | "split by paragraphs and ols/uls"
        | "split by sentences"
        | "split by section"
      scraped_type_enum:
        | "page-sup-research-feed"
        | "page-sup-research-breakdown"
        | "page-sup-faq"
        | "urls-supplements"
        | "urls-research-feeds"
        | "page-sup-references"
        | "page-sup-examine-database"
        | "page-sup-hero"
        | "page-research-feed"
        | "page-research-breakdown"
      stack_status: "draft" | "published"
      stack_type: "skincare" | "workout" | "supplement"
      use_case_type: "condition" | "goal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
