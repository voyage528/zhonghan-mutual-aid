export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(`
    SELECT p.id, p.category, p.author, p.title, p.content, p.created_at,
    (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count
    FROM posts p ORDER BY p.created_at DESC LIMIT 100
  `).all();
  return Response.json(results);
}
export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return Response.json({error:"提交内容格式不正确"}, {status:400}); }
  const category = String(body.category || "");
  const author = String(body.author || "热心同学").trim().slice(0,30) || "热心同学";
  const title = String(body.title || "").trim().slice(0,100);
  const content = String(body.content || "").trim().slice(0,5000);
  if (!["翻译求助","景点推荐","生活互助"].includes(category)) return Response.json({error:"请选择有效分类"}, {status:400});
  if (!title || !content) return Response.json({error:"标题和内容不能为空"}, {status:400});
  await env.DB.prepare("INSERT INTO posts (category, author, title, content) VALUES (?, ?, ?, ?)")
    .bind(category, author, title, content).run();
  return Response.json({ok:true}, {status:201});
}