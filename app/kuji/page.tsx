"use client";
import React, { useState } from "react";
import { Button, Card, Group, Stack, Title, Text, Divider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// ポケモン151匹の名前リスト
const pokemon151 = [
  "フシギダネ", "フシギソウ", "フシギバナ", "ヒトカゲ", "リザード", "リザードン",
  "ゼニガメ", "カメール", "カメックス", "キャタピー", "トランセル", "バタフリー",
  "ビードル", "コクーン", "スピアー", "ポッポ", "ピジョン", "ピジョット",
  "コラッタ", "ラッタ", "オニスズメ", "オニドリル", "アーボ", "アーボック",
  "ピカチュウ", "ライチュウ", "サンド", "サンドパン", "ニドラン♀", "ニドリーナ",
  "ニドクイン", "ニドラン♂", "ニドリーノ", "ニドキング", "ピッピ", "ピクシー",
  "ロコン", "キュウコン", "プリン", "プクリン", "ズバット", "ゴルバット",
  "ナゾノクサ", "クサイハナ", "ラフレシア", "パラス", "パラセクト", "コンパン",
  "モルフォン", "ディグダ", "ダグトリオ", "ニャース", "ペルシアン", "コダック",
  "ゴルダック", "マンキー", "オコリザル", "ガーディ", "ウインディ", "ニョロモ",
  "ニョロゾ", "ニョロボン", "ケーシィ", "ユンゲラー", "フーディン", "ワンリキー",
  "ゴーリキー", "カイリキー", "マダツボミ", "ウツドン", "ウツボット", "メノクラゲ",
  "ドククラゲ", "イシツブテ", "ゴローン", "ゴローニャ", "ポニータ", "ギャロップ",
  "ヤドン", "ヤドラン", "コイル", "レアコイル", "カモネギ", "ドードー", "ドードリオ",
  "パウワウ", "ジュゴン", "ベトベター", "ベトベトン", "シェルダー", "パルシェン",
  "ゴース", "ゴースト", "ゲンガー", "イワーク", "スリープ", "スリーパー",
  "クラブ", "キングラー", "ビリリダマ", "マルマイン", "タマタマ", "ナッシー",
  "カラカラ", "ガラガラ", "サワムラー", "エビワラー", "ベロリンガ", "ドガース",
  "マタドガス", "サイホーン", "サイドン", "ラッキー", "モンジャラ", "ガルーラ",
  "タッツー", "シードラ", "トサキント", "アズマオウ", "ヒトデマン", "スターミー",
  "バリヤード", "ストライク", "ルージュラ", "エレブー", "ブーバー", "カイロス",
  "ケンタロス", "コイキング", "ギャラドス", "ラプラス", "メタモン", "イーブイ",
  "シャワーズ", "サンダース", "ブースター", "ポリゴン", "オムナイト", "オムスター",
  "カブト", "カブトプス", "プテラ", "カビゴン", "フリーザー", "サンダー",
  "ファイヤー", "ミニリュウ", "ハクリュー", "カイリュー", "ミュウツー", "ミュウ"
];

// シャッフル関数
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function KujiPage() {
  const [kujiList, setKujiList] = useState<string[]>([]);
  const [drawnList, setDrawnList] = useState<string[]>([]);
  const [lastDraw, setLastDraw] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleCreateKuji = () => {
    setKujiList(shuffle(pokemon151));
    setDrawnList([]);
    setLastDraw(null);
    close();
  };

  const handleCreateClick = () => {
    if (drawnList.length > 0 || kujiList.length > 0) {
      open();
    } else {
      handleCreateKuji();
    }
  };

  const handleDraw = () => {
    if (kujiList.length === 0) return;
    setLastDraw(kujiList[0]);
    setDrawnList([...drawnList, kujiList[0]]);
    setKujiList(kujiList.slice(1));
  };

  return (
    <Stack align="center" gap="md" p="md">
      <Modal opened={opened} onClose={close} title="くじをリセットしますか？" centered>
        <Text mb="md">すでにくじが進行中です。新しく作成するとリセットされます。よろしいですか？</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>キャンセル</Button>
          <Button color="red" onClick={handleCreateKuji}>リセットして作成</Button>
        </Group>
      </Modal>
      <Title order={1} ta="center">ポケモン151くじ</Title>
      <Group>
        <Button onClick={handleCreateClick} color="teal" variant="filled">
          くじを作成
        </Button>
        <Button onClick={handleDraw} disabled={kujiList.length === 0} color="blue">
          くじを引く
        </Button>
      </Group>

      <Group align="flex-start" gap="md">
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Title order={3} size="h4">いま引いたくじ</Title>
          <Text size="xl" fw={700} c="blue">
            {lastDraw ?? "まだ引いていません"}
          </Text>
        </Card>
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Title order={3} size="h4">直前に引いたくじ</Title>
          <Text size="lg">
            {drawnList.length > 1 ? drawnList[drawnList.length - 2] : "まだありません"}
          </Text>
        </Card>
      </Group>

      <Divider my="sm" />

      <Card shadow="sm" padding="md" radius="md" withBorder w="100%">
        <Title order={4} size="h5">
          引いたポケモン（{drawnList.length}）
        </Title>
        <Text size="sm" c="gray">
          {drawnList.length > 0 ? drawnList.join(", ") : "まだありません"}
        </Text>
      </Card>

      <Card shadow="sm" padding="md" radius="md" withBorder w="100%">
        <Title order={4} size="h5">
          残りのくじ（{kujiList.length}）
        </Title>
        <Text size="sm" c="gray">
          {kujiList.length > 0 ? kujiList.join(", ") : "すべて引き終わりました"}
        </Text>
      </Card>
    </Stack>
  );
}