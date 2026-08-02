export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CourseStatus = "draft" | "published" | "archived";
export type EnrollmentStatus = "enrolled" | "completed" | "dropped";
export type DiscussionType = "question" | "answer" | "reply";
export type PaymentOrderStatus = "pending" | "paid" | "failed" | "cancelled";

type Relationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          legacy_ulid: string | null;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          mobile: string | null;
          job_title: string | null;
          birth_date: string | null;
          avatar_url: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          legacy_ulid?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          mobile?: string | null;
          job_title?: string | null;
          birth_date?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          legacy_ulid?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          mobile?: string | null;
          job_title?: string | null;
          birth_date?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      courses: {
        Row: {
          id: string;
          title: string;
          short_description: string | null;
          description: string | null;
          slug: string;
          instructor_id: string | null;
          status: CourseStatus;
          price: number;
          sale_price: number | null;
          currency: string;
          cover_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          short_description?: string | null;
          description?: string | null;
          slug: string;
          instructor_id?: string | null;
          status?: CourseStatus;
          price?: number;
          sale_price?: number | null;
          currency?: string;
          cover_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          short_description?: string | null;
          description?: string | null;
          slug?: string;
          instructor_id?: string | null;
          status?: CourseStatus;
          price?: number;
          sale_price?: number | null;
          currency?: string;
          cover_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      chapters: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          course_id: string;
          title: string;
          description?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      lessons: {
        Row: {
          id: string;
          chapter_id: string;
          title: string;
          content: string | null;
          video_url: string | null;
          duration: number | null;
          order: number;
          is_free: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          chapter_id: string;
          title: string;
          content?: string | null;
          video_url?: string | null;
          duration?: number | null;
          order?: number;
          is_free?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          chapter_id?: string;
          title?: string;
          content?: string | null;
          video_url?: string | null;
          duration?: number | null;
          order?: number;
          is_free?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      user_courses: {
        Row: {
          id: string;
          course_id: string;
          user_id: string;
          status: EnrollmentStatus;
          current_lesson_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          course_id: string;
          user_id: string;
          status?: EnrollmentStatus;
          current_lesson_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          user_id?: string;
          status?: EnrollmentStatus;
          current_lesson_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      user_lessons: {
        Row: {
          user_id: string;
          lesson_id: string;
          watched_duration: number;
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          watched_duration?: number;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          lesson_id?: string;
          watched_duration?: number;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      lesson_notes: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          content: string;
          timestamp: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          lesson_id: string;
          content: string;
          timestamp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          content?: string;
          timestamp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      discussions: {
        Row: {
          id: string;
          lesson_id: string;
          user_id: string;
          parent_id: string | null;
          content: string;
          type: DiscussionType;
          is_resolved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          lesson_id: string;
          user_id: string;
          parent_id?: string | null;
          content: string;
          type?: DiscussionType;
          is_resolved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          user_id?: string;
          parent_id?: string | null;
          content?: string;
          type?: DiscussionType;
          is_resolved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
      payment_orders: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          amount: number;
          currency: string;
          status: PaymentOrderStatus;
          zibal_track_id: number | null;
          zibal_ref_number: string | null;
          description: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          course_id: string;
          amount: number;
          currency?: string;
          status?: PaymentOrderStatus;
          zibal_track_id?: number | null;
          zibal_ref_number?: string | null;
          description?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          amount?: number;
          currency?: string;
          status?: PaymentOrderStatus;
          zibal_track_id?: number | null;
          zibal_ref_number?: string | null;
          description?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: Relationship[];
      };
    };
    Views: {
      lesson_summaries: {
        Row: {
          id: string;
          chapter_id: string;
          title: string;
          duration: number | null;
          order: number;
          is_free: boolean;
          course_id: string;
        };
        Relationships: Relationship[];
      };
    };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      is_enrolled: { Args: { p_course_id: string }; Returns: boolean };
      lesson_course_id: { Args: { p_lesson_id: string }; Returns: string };
      course_final_price: {
        Args: { p_price: number; p_sale_price: number | null };
        Returns: number;
      };
      is_course_free: { Args: { p_course_id: string }; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Chapter = Database["public"]["Tables"]["chapters"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type UserCourse = Database["public"]["Tables"]["user_courses"]["Row"];
export type UserLesson = Database["public"]["Tables"]["user_lessons"]["Row"];
export type LessonNote = Database["public"]["Tables"]["lesson_notes"]["Row"];
export type PaymentOrder =
  Database["public"]["Tables"]["payment_orders"]["Row"];
export type LessonSummary =
  Database["public"]["Views"]["lesson_summaries"]["Row"];
