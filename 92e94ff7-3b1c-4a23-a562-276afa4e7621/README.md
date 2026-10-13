# 余白ノート

Cloudflare Pages向けの、日本語の静的ブログです。ビルドツールやサーバーサイド機能は不要です。

## Cloudflare Pagesへデプロイ

1. このフォルダーをGitHubリポジトリにpushします。
2. Cloudflare Dashboardで **Workers & Pages → Create application → Pages → Connect to Git** を選び、リポジトリを接続します。
3. Framework presetは **None**、Build commandは空欄、Build output directoryは `.` にします。
4. 保存してデプロイします。以降は既定ブランチへのpushで自動デプロイされます。

## Google アナリティクス（GA4・任意）

1. Google アナリティクスでGA4プロパティとウェブデータストリームを作成し、測定ID（`G-` で始まる値）を取得します。
2. `analytics-config.js` の `googleAnalyticsId` に測定IDを設定します。
3. 変更をpushしてCloudflare Pagesを再デプロイします。トップページ、記事、ギャラリーで計測が始まります。GA4レポートはGoogle アナリティクスにログインして確認します。ブログ内にレポートや管理画面は表示しません。

測定IDは公開サイトのHTMLや通信から見える識別子であり、秘密情報ではありません。レポートの閲覧権限はGoogle アナリティクスのアカウント側で管理してください。GA4はCookie等を使った計測を行うため、公開地域やサイトの運用に応じてプライバシー通知や同意取得が必要か確認してください。ユーザー数や滞在時間などはGoogleの定義に基づく推定値で、全訪問を完全に識別・記録するものではありません。

測定IDが空なら計測スクリプトは読み込まれません。アクセス数などの架空の数値は表示しません。

## ページとギャラリーの編集

- トップページは `index.html`、イラスト一覧は `gallery.html`、個別記事は `articles/` 内のHTMLファイルを編集します。
- ギャラリーのイラストは `gallery.html` の各 `<figure class="gallery-item">` にあるSVGです。作品を追加するときはfigureを複製して、SVGとタイトル・カテゴリを変更してください。画像ファイルを使う場合はSVGを `<img src="images/your-illustration.png" alt="イラストの説明">` に置き換え、画像を `images/` に保存します。
- ギャラリーの画像をクリック（またはキーボードで選択）すると拡大表示し、Escキー・背景クリック・閉じるボタンで閉じられます。
- 共通の見た目は `styles.css`、各ページ上部のナビゲーションはそれぞれのHTMLファイル内にあります。
