// 06 — Login: 三重県観光連盟 / 自治体職員 向けログイン画面
function ScreenLogin() {
  return (
    <div style={{
      width: 1440, height: 900, display: 'flex', fontFamily: T.sans, color: T.body,
      background: T.paper, overflow: 'hidden',
    }}>
      {/* ── 左: ブランドパネル ─────────────────────────────────── */}
      <div style={{
        width: 620, background: T.ink, color: '#fff',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', padding: '48px 56px',
      }}>
        {/* 背景: 海の波と森のテクスチャ */}
        <svg width="620" height="900" style={{ position: 'absolute', inset: 0, opacity: 0.16 }}>
          <defs>
            <pattern id="wave" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 20 5, 40 20 T 80 20" stroke={T.sea} strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect x="0" y="540" width="620" height="360" fill="url(#wave)"/>
          {/* 鳥居シルエット (大きく、薄く) */}
          <g transform="translate(310, 360)" opacity="0.18">
            <path d="M -160 -120 Q 0 -150, 160 -120 L 160 -100 L -160 -100 Z" fill={T.shu}/>
            <rect x="-150" y="-95" width="300" height="14" fill={T.shu}/>
            <rect x="-110" y="-80" width="14" height="200" fill={T.shu}/>
            <rect x="96"   y="-80" width="14" height="200" fill={T.shu}/>
            <rect x="-90"  y="-30" width="180" height="8" fill={T.shu}/>
          </g>
          {/* 山並み */}
          <path d="M0 720 L 80 660 L 160 700 L 260 640 L 360 690 L 460 650 L 540 700 L 620 670 L 620 900 L 0 900 Z" fill={T.pine} opacity="0.5"/>
        </svg>

        {/* ロゴ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10, background: T.shu,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 24,
          }}>⛩</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0.5 }}>伊勢観光分析</div>
            <div style={{ fontSize: 11, color: T.faint, marginTop: 2 }}>伊勢志摩 観光プロモーション支援システム</div>
          </div>
        </div>

        {/* 中央コピー */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', marginTop: -40 }}>
          <div style={{ fontSize: 11, color: T.shu2, letterSpacing: 3, marginBottom: 12 }}>WELCOME BACK</div>
          <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.4, letterSpacing: 0.5 }}>
            旅人の声から、<br/>
            伊勢志摩の<span style={{ color: T.shu2 }}>のびしろ</span>を見つける。
          </div>
          <div style={{ fontSize: 14, color: T.faint, marginTop: 18, lineHeight: 1.8, maxWidth: 480 }}>
            YouTube 上に投稿された旅行動画を、米国向けの英語投稿として整理・評価。<br/>
            毎朝の確認から、議会向け資料の作成までを 1 つの画面で。
          </div>

          {/* 指標バー */}
          <div style={{
            marginTop: 36, display: 'flex', gap: 32,
            paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)',
          }}>
            {[
              { v: '1,284', u: '本', l: '今月の旅行者の動画' },
              { v: '462', u: '万回', l: '世界からの視聴' },
              { v: '5', u: '市場', l: '対象言語で分析' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: T.num, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
                  {s.v}<span style={{ fontSize: 13, color: T.faint, marginLeft: 3, fontWeight: 500 }}>{s.u}</span>
                </div>
                <div style={{ fontSize: 10.5, color: T.muted, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 11, color: T.muted, position: 'relative',
        }}>
          <span>© 2026 三重県観光連盟 · 伊勢観光分析</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <span>サポート</span>
            <span>プライバシー</span>
            <span>利用規約</span>
          </span>
        </div>
      </div>

      {/* ── 右: ログインフォーム ─────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: 48,
      }}>
        <div style={{ width: 420 }}>
          <div style={{ fontSize: 11, color: T.shu, letterSpacing: 2, marginBottom: 8 }}>SIGN IN</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: T.ink, letterSpacing: 0.3 }}>ログイン</div>
          <div style={{ fontSize: 12.5, color: T.muted, marginTop: 6 }}>
            職員アカウントでサインインしてください。
          </div>

          {/* SSO ボタン */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 28 }}>
            <button style={ssoBtn()}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path fill="#4285F4" d="M15.5 8.2c0-.6 0-1.1-.1-1.6H8v3h4.2c-.2 1-.7 1.8-1.6 2.4v2h2.6c1.5-1.4 2.3-3.5 2.3-5.8Z"/>
                <path fill="#34A853" d="M8 16c2.2 0 4-.7 5.3-2l-2.6-2c-.7.5-1.6.8-2.7.8-2.1 0-3.8-1.4-4.4-3.3H.9v2.1C2.2 14.3 4.9 16 8 16Z"/>
                <path fill="#FBBC04" d="M3.6 9.5c-.1-.4-.2-.9-.2-1.5s.1-1.1.2-1.5V4.4H.9C.3 5.5 0 6.7 0 8s.3 2.5.9 3.6l2.7-2.1Z"/>
                <path fill="#EA4335" d="M8 3.2c1.2 0 2.3.4 3.1 1.2l2.3-2.3C12 .7 10.2 0 8 0 4.9 0 2.2 1.7.9 4.4l2.7 2.1C4.2 4.6 5.9 3.2 8 3.2Z"/>
              </svg>
              Google ワークスペースでサインイン
            </button>
            <button style={ssoBtn()}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6.5" height="6.5" fill="#F25022"/>
                <rect x="8.5" y="1" width="6.5" height="6.5" fill="#7FBA00"/>
                <rect x="1" y="8.5" width="6.5" height="6.5" fill="#00A4EF"/>
                <rect x="8.5" y="8.5" width="6.5" height="6.5" fill="#FFB900"/>
              </svg>
              Microsoft 365 でサインイン
            </button>
          </div>

          {/* 区切り */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0',
            fontSize: 10.5, color: T.muted, letterSpacing: 1,
          }}>
            <span style={{ flex: 1, height: 1, background: T.line }} />
            または メールアドレスで
            <span style={{ flex: 1, height: 1, background: T.line }} />
          </div>

          {/* メール / パスワード */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="メールアドレス" value="tanaka.misato@pref.mie.lg.jp" />
            <Field
              label="パスワード"
              value="••••••••••••"
              type="password"
              hint={<a style={{ color: T.shu, fontSize: 11, textDecoration: 'none' }}>忘れた方</a>}
            />

            {/* 二段階認証 */}
            <div style={{
              background: T.paper, border: `1px solid ${T.line}`, borderRadius: 8,
              padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 2,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, background: T.pineSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.pine,
              }}>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="7" width="10" height="7" rx="1"/>
                  <path d="M5 7V5a3 3 0 0 1 6 0v2"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>二段階認証が有効です</div>
                <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>
                  サインイン後に SMS / 認証アプリで確認します
                </div>
              </div>
              <Chip tone="pine">ON</Chip>
            </div>

            {/* チェックボックス */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.body, cursor: 'pointer' }}>
                <span style={{
                  width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${T.ink}`,
                  background: T.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}>{Ico.check}</span>
                このパソコンを 30 日間 覚えておく
              </label>
              <a style={{ fontSize: 11, color: T.muted }}>サインインできない</a>
            </div>

            {/* メインボタン */}
            <button style={{
              marginTop: 8, height: 44, borderRadius: 8, border: 'none',
              background: T.ink, color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: T.sans, letterSpacing: 0.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              ログインしてはじめる
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          </div>

          {/* セキュリティ注意書き */}
          <div style={{
            marginTop: 22, padding: '10px 12px', borderRadius: 6,
            background: 'rgba(197,67,44,0.05)', border: `1px solid ${T.shuSoft}`,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <span style={{ color: T.shu, marginTop: 1 }}>{Ico.warn}</span>
            <div style={{ fontSize: 11, color: T.body, lineHeight: 1.6 }}>
              本システムには <b style={{ color: T.ink }}>非公開の観光データ</b> が含まれます。<br/>
              公共の端末ではログインしないでください。
            </div>
          </div>

          {/* 最終ログイン */}
          <div style={{
            marginTop: 18, fontSize: 10.5, color: T.muted, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>前回のサインイン: 2026年5月17日 17:08 · 津市内</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: T.pine }} />
              サービス正常
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, type = 'text', hint }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <label style={{ fontSize: 11.5, color: T.body, fontWeight: 500 }}>{label}</label>
        {hint}
      </div>
      <div style={{
        height: 42, borderRadius: 8, border: `1px solid ${T.line}`, background: T.card,
        padding: '0 12px', display: 'flex', alignItems: 'center',
        fontSize: 13, color: T.ink, fontFamily: type === 'password' ? T.mono : T.sans,
        letterSpacing: type === 'password' ? 2 : 0,
      }}>{value}</div>
    </div>
  );
}

function ssoBtn() {
  return {
    height: 42, borderRadius: 8, border: `1px solid ${T.line}`,
    background: T.card, color: T.ink, fontSize: 13, fontFamily: T.sans, fontWeight: 500,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
  };
}

Object.assign(window, { ScreenLogin });

