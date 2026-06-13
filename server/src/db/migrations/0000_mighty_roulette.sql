CREATE TABLE "ProblemRelations" (
	"problem_id" uuid NOT NULL,
	"related_problem_id" uuid NOT NULL,
	CONSTRAINT "ProblemRelations_problem_id_related_problem_id_pk" PRIMARY KEY("problem_id","related_problem_id")
);
--> statement-breakpoint
CREATE TABLE "ProblemTags" (
	"problem_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "ProblemTags_problem_id_tag_id_pk" PRIMARY KEY("problem_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "Problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_number" integer NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"difficulty" varchar(8) NOT NULL,
	"description" text NOT NULL,
	"constraints" text[],
	"hints" text[],
	"examples" jsonb,
	"starter_code" jsonb,
	"image_url" text,
	"recommended_minutes" integer,
	"time_limit_ms" integer DEFAULT 1000 NOT NULL,
	"memory_limit_mb" integer DEFAULT 256 NOT NULL,
	"badges" text[],
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "Problems_problem_number_unique" UNIQUE("problem_number"),
	CONSTRAINT "Problems_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "Submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"problem_id" uuid NOT NULL,
	"language" varchar(50) NOT NULL,
	"code" text NOT NULL,
	"status" varchar(20) NOT NULL,
	"runtime_ms" integer,
	"memory_kb" integer,
	"passed_test_cases" integer,
	"total_test_cases" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "Tags_name_unique" UNIQUE("name"),
	CONSTRAINT "Tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "TestCases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"input" text NOT NULL,
	"expected_output" text NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" varchar(255),
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"password" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "User_username_unique" UNIQUE("username"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "ProblemRelations" ADD CONSTRAINT "ProblemRelations_problem_id_Problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."Problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProblemRelations" ADD CONSTRAINT "ProblemRelations_related_problem_id_Problems_id_fk" FOREIGN KEY ("related_problem_id") REFERENCES "public"."Problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProblemTags" ADD CONSTRAINT "ProblemTags_problem_id_Problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."Problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProblemTags" ADD CONSTRAINT "ProblemTags_tag_id_Tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."Tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_problem_id_Problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."Problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_problem_id_Problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."Problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "problems_status_idx" ON "Problems" USING btree ("status");--> statement-breakpoint
CREATE INDEX "problems_difficulty_idx" ON "Problems" USING btree ("difficulty");--> statement-breakpoint
CREATE INDEX "submissions_user_id_idx" ON "Submissions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "submissions_problem_id_idx" ON "Submissions" USING btree ("problem_id");--> statement-breakpoint
CREATE INDEX "submissions_created_at_idx" ON "Submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "test_cases_problem_id_idx" ON "TestCases" USING btree ("problem_id");