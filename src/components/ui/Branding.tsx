import { Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { FractalBrand } from '@decent-org/fractal-ui'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { FractalLogo } from '../icons/FractalLogo'

export function Branding() {
  const navigate = useNavigate()
  return (
    <Flex
      alignItems={{ 'min1000': 'center', 'min1920': 'flex-start' }}
      flexDirection={{ 'min1000': 'row', 'min1920': 'column' }}
      h='full'
      justifyContent='space-between'
      px={12}
      pt={{ 'min1000': 0, 'min1920': 28 }}
      pb={{ 'min1000': 0, 'min1920': 12 }}
    >
      <Flex
        alignItems={{ 'min1000': 'center', 'min1920': 'flex-start' }}
        flexDirection={{ 'min1000': 'row', 'min1920': 'column' }}
        gap={{ 'min1000': 0, 'min1920': '12' }}
        w='full'
      >
        <IconButton
          aria-label='home'
          icon={<FractalLogo width='12rem' height='auto' />}
          onClick={() => navigate(ROUTES.base.relative())}
          variant='unstyled'
        />
        <Flex
          alignItems={{ 'min1000': 'center', 'min1920': 'flex-start' }}
          flexDirection='column'
          gap={{ 'min1000': 0, 'min1920': '4' }}
          justifyContent={{ 'min1000': 'center', 'min1920': 'flex-start' }}
          w='full'
        >
          <Text
            color='gold.500'
            textStyle={{ 'min1000': 'text-2xl-mono-semibold', 'min1920': 'text-6xl-mono-semibold' }}
          >
            On - Chain Connect 4
          </Text>
          <Text
            textStyle={{ 'min1000': 'text-base-mono-semibold', 'min1920': 'text-2xl-mono-semibold' }}
          >
            POWERED BY{' '}
            <Link
              href='https://www.decent-dao.org/'
              rel='noopener noreferrer'
              target='_blank'
              textDecoration='underline'
            >
              DECENT
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={{ 'min1000': 'flex-end', 'min1920': 'flex-start' }}
        width={{ 'min1000': '12rem', 'min1920': 'auto' }}
      >
        <Link href='https://www.fractalframework.xyz/' target='_blank' rel='noopener noreferer'>
          <IconButton
            aria-label='home'
            icon={<FractalBrand boxSize={{ 'min1000': '24', 'min1920': '32' }} />}
            variant='unstyled'
          />
        </Link>
      </Flex>
    </Flex>
  )
}
