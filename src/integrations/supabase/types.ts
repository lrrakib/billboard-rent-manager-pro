export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billboard_documents: {
        Row: {
          billboard_id: string
          created_at: string
          document_name: string
          document_type: string
          document_url: string
          id: string
          notes: string | null
          upload_date: string
        }
        Insert: {
          billboard_id: string
          created_at?: string
          document_name: string
          document_type: string
          document_url: string
          id?: string
          notes?: string | null
          upload_date?: string
        }
        Update: {
          billboard_id?: string
          created_at?: string
          document_name?: string
          document_type?: string
          document_url?: string
          id?: string
          notes?: string | null
          upload_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "billboard_documents_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billboard_documents_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      billboard_rentals: {
        Row: {
          billboard_id: string
          client_id: string
          contract_document_url: string | null
          created_at: string
          end_date: string
          id: string
          invoice_date: number
          invoice_frequency: string
          notes: string | null
          payment_structure: string | null
          rental_amount: number
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          billboard_id: string
          client_id: string
          contract_document_url?: string | null
          created_at?: string
          end_date: string
          id?: string
          invoice_date: number
          invoice_frequency?: string
          notes?: string | null
          payment_structure?: string | null
          rental_amount: number
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          billboard_id?: string
          client_id?: string
          contract_document_url?: string | null
          created_at?: string
          end_date?: string
          id?: string
          invoice_date?: number
          invoice_frequency?: string
          notes?: string | null
          payment_structure?: string | null
          rental_amount?: number
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "billboard_rentals_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billboard_rentals_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billboard_rentals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_rentals_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_rentals_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_rentals_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients_enhanced"
            referencedColumns: ["id"]
          },
        ]
      }
      billboards_enhanced: {
        Row: {
          agreement_document_url: string | null
          agreement_end_date: string | null
          agreement_start_date: string | null
          billboard_identifier: string | null
          created_at: string
          id: string
          image_urls: string[] | null
          installation_cost: number | null
          installation_date: string | null
          land_owner_id: string | null
          location: string
          payment_month: number | null
          rent_amount: number | null
          size: string
          status: string
          total_installation_cost: number | null
          total_sft: number | null
          type: string
          updated_at: string
        }
        Insert: {
          agreement_document_url?: string | null
          agreement_end_date?: string | null
          agreement_start_date?: string | null
          billboard_identifier?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          installation_cost?: number | null
          installation_date?: string | null
          land_owner_id?: string | null
          location: string
          payment_month?: number | null
          rent_amount?: number | null
          size: string
          status?: string
          total_installation_cost?: number | null
          total_sft?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          agreement_document_url?: string | null
          agreement_end_date?: string | null
          agreement_start_date?: string | null
          billboard_identifier?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          installation_cost?: number | null
          installation_date?: string | null
          land_owner_id?: string | null
          location?: string
          payment_month?: number | null
          rent_amount?: number | null
          size?: string
          status?: string
          total_installation_cost?: number | null
          total_sft?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "billboards_enhanced_land_owner_id_fkey"
            columns: ["land_owner_id"]
            isOneToOne: false
            referencedRelation: "land_owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_billboards_land_owner"
            columns: ["land_owner_id"]
            isOneToOne: false
            referencedRelation: "land_owners"
            referencedColumns: ["id"]
          },
        ]
      }
      client_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_period_end: string
          invoice_period_start: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          receipt_id: string | null
          rental_id: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_period_end: string
          invoice_period_start: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          receipt_id?: string | null
          rental_id: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_period_end?: string
          invoice_period_start?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          receipt_id?: string | null
          rental_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_payments_rental_id_fkey"
            columns: ["rental_id"]
            isOneToOne: false
            referencedRelation: "billboard_rentals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_client_payments_rental"
            columns: ["rental_id"]
            isOneToOne: false
            referencedRelation: "billboard_rentals"
            referencedColumns: ["id"]
          },
        ]
      }
      clients_enhanced: {
        Row: {
          billing_address: string | null
          company_name: string
          contact_email: string
          contact_person: string
          contact_phone: string | null
          created_at: string
          id: string
          industry: string | null
          updated_at: string
        }
        Insert: {
          billing_address?: string | null
          company_name: string
          contact_email: string
          contact_person: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          updated_at?: string
        }
        Update: {
          billing_address?: string | null
          company_name?: string
          contact_email?: string
          contact_person?: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      installation_costs: {
        Row: {
          amount: number
          billboard_id: string
          cost_type: string
          created_at: string
          description: string | null
          id: string
          partner_id: string | null
          payment_date: string
          payment_method: string | null
          receipt_url: string | null
        }
        Insert: {
          amount: number
          billboard_id: string
          cost_type: string
          created_at?: string
          description?: string | null
          id?: string
          partner_id?: string | null
          payment_date?: string
          payment_method?: string | null
          receipt_url?: string | null
        }
        Update: {
          amount?: number
          billboard_id?: string
          cost_type?: string
          created_at?: string
          description?: string | null
          id?: string
          partner_id?: string | null
          payment_date?: string
          payment_method?: string | null
          receipt_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_installation_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_installation_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_installation_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installation_costs_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installation_costs_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installation_costs_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      land_owner_payments: {
        Row: {
          amount: number
          billboard_id: string
          created_at: string
          id: string
          land_owner_id: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_year_end: string
          payment_year_start: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          billboard_id: string
          created_at?: string
          id?: string
          land_owner_id: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_year_end: string
          payment_year_start: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          billboard_id?: string
          created_at?: string
          id?: string
          land_owner_id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_year_end?: string
          payment_year_start?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_land_owner_payments_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_land_owner_payments_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_land_owner_payments_owner"
            columns: ["land_owner_id"]
            isOneToOne: false
            referencedRelation: "land_owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "land_owner_payments_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "land_owner_payments_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "land_owner_payments_land_owner_id_fkey"
            columns: ["land_owner_id"]
            isOneToOne: false
            referencedRelation: "land_owners"
            referencedColumns: ["id"]
          },
        ]
      }
      land_owners: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      partner_investments: {
        Row: {
          billboard_id: string
          created_at: string
          id: string
          investment_amount: number
          investment_date: string
          investment_percentage: number
          notes: string | null
          partner_id: string
          purpose: string
          updated_at: string
        }
        Insert: {
          billboard_id: string
          created_at?: string
          id?: string
          investment_amount: number
          investment_date?: string
          investment_percentage: number
          notes?: string | null
          partner_id: string
          purpose: string
          updated_at?: string
        }
        Update: {
          billboard_id?: string
          created_at?: string
          id?: string
          investment_amount?: number
          investment_date?: string
          investment_percentage?: number
          notes?: string | null
          partner_id?: string
          purpose?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_partner_investments_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner_investments_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner_investments_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_investments_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_investments_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_investments_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      billboard_profit_summary: {
        Row: {
          billboard_identifier: string | null
          id: string | null
          location: string | null
          partner_count: number | null
          total_installation_cost: number | null
          total_profit: number | null
          total_yearly_rental: number | null
        }
        Relationships: []
      }
      partner_profit_share: {
        Row: {
          billboard_id: string | null
          billboard_identifier: string | null
          investment_amount: number | null
          investment_percentage: number | null
          location: string | null
          partner_id: string | null
          partner_name: string | null
          partner_profit_share: number | null
          total_profit: number | null
          total_yearly_rental: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_partner_investments_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner_investments_billboard"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_partner_investments_partner"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_investments_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboard_profit_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_investments_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_investments_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
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
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
