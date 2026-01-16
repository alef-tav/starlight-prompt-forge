-- Create storage bucket for portfolio videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-videos', 'portfolio-videos', true);

-- Allow public read access to portfolio videos
CREATE POLICY "Public read access for portfolio videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-videos');

-- Allow authenticated users to upload videos (admin only in practice)
CREATE POLICY "Authenticated users can upload portfolio videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-videos' AND auth.role() = 'authenticated');