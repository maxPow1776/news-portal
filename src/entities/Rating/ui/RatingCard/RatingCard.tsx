import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

export interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo(
  ({ className, title, feedbackTitle, hasFeedback, onCancel, onAccept, rate = 0 }: RatingCardProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      },
      [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <>
            <TextDeprecated title={feedbackTitle} />
            <InputDeprecated
              placeholder={t('yourFeedback')}
              value={feedback}
              onChange={setFeedback}
              data-testid="rating-card.input"
            />
          </>
        }
        on={
          <>
            <Text title={feedbackTitle} />
            <Input
              placeholder={t('yourFeedback')}
              value={feedback}
              onChange={setFeedback}
              data-testid="rating-card.input"
            />
          </>
        }
      />
    );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <CardDeprecated className={className} max data-testid="rating-card">
            <VStack align="center" gap="8">
              <TextDeprecated title={starsCount ? t('thankYouForRating') : title} />
              <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
              <Modal isOpen={isModalOpen} lazy>
                <VStack max gap="32">
                  {modalContent}
                  <HStack max gap="16" justify="end">
                    <ButtonDeprecated
                      data-testid="rating-card.close"
                      onClick={cancelHandle}
                      theme={ButtonTheme.OUTLINE_RED}>
                      {t('close')}
                    </ButtonDeprecated>
                    <ButtonDeprecated data-testid="rating-card.send" onClick={acceptHandle}>
                      {t('send')}
                    </ButtonDeprecated>
                  </HStack>
                </VStack>
              </Modal>
            </BrowserView>
            <MobileView>
              <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                <VStack max gap="32">
                  {modalContent}
                  <ButtonDeprecated onClick={acceptHandle} size={ButtonSize.L} fullWidth>
                    {t('send')}
                  </ButtonDeprecated>
                </VStack>
              </Drawer>
            </MobileView>
          </CardDeprecated>
        }
        on={
          <Card className={className} max data-testid="rating-card" padding="24" border="partial">
            <VStack align="center" gap="8">
              <Text title={starsCount ? t('thankYouForRating') : title} />
              <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
              <Modal isOpen={isModalOpen} lazy>
                <VStack max gap="32">
                  {modalContent}
                  <HStack max gap="16" justify="end">
                    <Button data-testid="rating-card.close" onClick={cancelHandle} variant="outline">
                      {t('close')}
                    </Button>
                    <Button data-testid="rating-card.send" onClick={acceptHandle}>
                      {t('send')}
                    </Button>
                  </HStack>
                </VStack>
              </Modal>
            </BrowserView>
            <MobileView>
              <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                <VStack max gap="32">
                  {modalContent}
                  <Button onClick={acceptHandle} size="l" fullWidth>
                    {t('send')}
                  </Button>
                </VStack>
              </Drawer>
            </MobileView>
          </Card>
        }
      />
    );
  },
);
