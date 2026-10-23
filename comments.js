export async function onRequestGet({ params, env }) {
  const postId = Number(params.id);
  if (!Number.isInteger(postId) || postId < 1) return Response.json({error:"帖子编号无效"}, {status:400});
  const { results } = await env.DB.prepare(
    "SELECT id, author, content, created_at FROM comments WHERE post_id = ? ORDER BY created_at ASC LIMIT 200"
  ).bind(postId).all();
  return Response.json(results);
}
export async function onRequestPost({ params, request, env }) {
  const postId = Number(params.id);
  if (!Number.isInteger(postId) || postId < 1) return Response.json({error:"帖子编号无效"}, {status:400});
  let body;
  try { body = await request.json(); } catch { return Response.json({error:"提交内容格式不正确"}, {status:400}); }
  const author = String(body.author || "热心同学").trim().slice(0,30) || "热心同学";
  const content = String(body.content || "").trim().slice(0,1000);
  if (!content) return Response.json({error:"评论内容不能为空"}, {status:400});
  const post = await env.DB.prepare("SELECT id FROM posts WHERE id = ?").bind(postId).first();
  if (!post) return Response.json({error:"找不到这条帖子"}, {status:404});
  await env.DB.prepare("INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)")
    .bind(postId, author, content).run();
  return Response.json({ok:true}, {status:201});
}